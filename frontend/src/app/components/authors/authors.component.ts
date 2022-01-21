import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../services/api.service";
import {Author} from "../../models/author";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Author>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['_id', 'name', 'action'];
  public dataSource: MatTableDataSource<Author> = new MatTableDataSource<Author>();
  public visibleDeleteModal: boolean = false;
  public visibleAddEditModal: boolean = false;
  public author: Author = {} as Author;
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  public isSubmitting: boolean = false;
  public isValidated: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAuthors().subscribe(value => {
      this.dataSource.data = value.reverse();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditDialog(author: Author = {} as Author) {
    this.form.reset();
    this.isValidated = false;
    this.visibleAddEditModal = true;
    this.author = author;
  }

  openDeleteDialog(author: Author) {
    this.visibleDeleteModal = true;
    this.author = author;
  }

  save() {
    this.isValidated = true;
    if (this.form.invalid) return;
    this.isSubmitting = true;
    if (this.author) {
      this.api.editAuthor(this.form.controls['name'].value, this.author._id).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.dataSource.data[this.dataSource.data.findIndex(x => x._id == this.author?._id)] = value;
          this.dataSource.data = [...this.dataSource.data];
          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      });
    } else {
      this.api.addAuthor(this.form.controls['name'].value).subscribe({
        next: value => {
          this.isSubmitting = false;
          let data = this.dataSource.data;
          data.unshift(value);
          this.dataSource.data = data;
          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      });
    }
  }

  delete() {
    this.isValidated = true;
    this.isSubmitting = true;
    this.api.deleteAuthor(this.author!._id).subscribe({
      next: value => {
        this.isSubmitting = false;
        this.visibleDeleteModal = false;
        let index = this.dataSource.data.findIndex(x => x._id == this.author?._id);
        this.dataSource.data.splice(index, 1)
        this.dataSource.data = [...this.dataSource.data];
      }, error: error => this.isSubmitting = false
    });
  }

}

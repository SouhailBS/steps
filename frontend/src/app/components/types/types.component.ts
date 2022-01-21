import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../services/api.service";
import {map, Observable, ReplaySubject} from "rxjs";
import {Type} from "../../models/type";
import {DataSource} from "@angular/cdk/collections";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Type>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['_id', 'name', 'action'];
  public dataSource: MatTableDataSource<Type> = new MatTableDataSource<Type>();
  public visibleDeleteModal: boolean = false;
  public visibleAddEditModal: boolean = false;
  public type?: Type;
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
  });
  public isSubmitting: boolean = false;
  public isValidated: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getTypes().subscribe(value => {
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

  openAddEditDialog(type?: Type) {
    this.form.reset();
    this.isValidated = false;
    this.visibleAddEditModal = true;
    this.form.patchValue({name: type?.name});
    this.type = type;
  }

  openDeleteDialog(type: Type) {
    this.visibleDeleteModal = true;
    this.type = type;
  }

  save() {
    this.isValidated = true;
    if (this.form.invalid) return;
    this.isSubmitting = true;
    if (this.type) {
      this.api.editType(this.form.controls['name'].value, this.type._id).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.dataSource.data[this.dataSource.data.findIndex(x => x._id == this.type?._id)] = value;
          this.dataSource.data = [...this.dataSource.data];

          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      });
    } else {
      this.api.addType(this.form.controls['name'].value).subscribe({
        next: value => {
          this.isSubmitting = false;
          let data = this.dataSource.data;
          data.unshift(value);
          this.dataSource.data = data;
          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      })
    }
  }

  delete() {
    this.isValidated = true;
    this.isSubmitting = true;
    this.api.deleteType(this.type!._id).subscribe({
      next: value => {
        this.isSubmitting = false;
        this.visibleDeleteModal = false;
        let index = this.dataSource.data.findIndex(x => x._id == this.type?._id);
        this.dataSource.data.splice(index, 1)
        this.dataSource.data = [...this.dataSource.data];
      }, error: error => this.isSubmitting = false
    });
  }
}

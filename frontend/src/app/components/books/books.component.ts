import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../services/api.service";
import {Book} from "../../models/book";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Type} from "../../models/type";
import {Author} from "../../models/author";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Book>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['_id', 'title', 'type', 'author', 'published_at', 'action'];
  public dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  public visibleDeleteModal: boolean = false;
  public visibleAddEditModal: boolean = false;
  public book?: Book;
  public form: FormGroup = new FormGroup({
    _id: new FormControl(),
    title: new FormControl(),
    type: new FormControl(),
    author: new FormControl(),
    published_at: new FormControl(),
  });
  public isSubmitting: boolean = false;
  public isValidated: boolean = false;
  public types: Type[] = [];
  public authors: Author[] = [];

  constructor(private api: ApiService, @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.api.getBooks().subscribe(value => {
      this.dataSource.data = value.reverse();
    });
    this.api.getTypes().subscribe(value => {
      this.types = value;
    });
    this.api.getAuthors().subscribe(value => {
      this.authors = value;
    });
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

  openAddEditDialog(book?: Book) {
    this.form.reset();
    this.isValidated = false;
    this.visibleAddEditModal = true;
    this.form.patchValue({
      _id: book?._id,
      title: book?.title,
      type: book?.type._id,
      author: book?.author._id,
      published_at: formatDate(book?.published_at!, 'yyyy-MM-dd', this.locale)
    })
    this.book = book;
  }

  openDeleteDialog(book: Book) {
    this.visibleDeleteModal = true;
    this.book = book;
  }

  save() {
    this.isValidated = true;
    if (this.form.invalid) return;
    this.isSubmitting = true;
    if (this.book) {
      this.api.editBook(
        this.form.get('_id')?.value,
        this.form.get('title')?.value,
        this.form.get('type')?.value,
        this.form.get('author')?.value,
        this.form.get('published_at')?.value
      ).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.dataSource.data[this.dataSource.data.findIndex(x => x._id == this.book?._id)] = value;
          this.dataSource.data = [...this.dataSource.data];

          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      })
    } else {
      this.api.addBook(
        this.form.get('title')?.value,
        this.form.get('type')?.value,
        this.form.get('author')?.value,
        this.form.get('published_at')?.value
      ).subscribe({
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
    this.api.deleteBook(this.book!._id).subscribe({
      next: value => {
        this.isSubmitting = false;
        this.visibleDeleteModal = false;
        let index = this.dataSource.data.findIndex(x => x._id == this.book?._id);
        this.dataSource.data.splice(index, 1)
        this.dataSource.data = [...this.dataSource.data];
      }, error: error => this.isSubmitting = false
    });
  }

}


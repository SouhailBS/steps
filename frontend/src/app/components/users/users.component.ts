import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../../services/api.service";
import {User} from "../../models/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = ['_id', 'name', 'email', 'action'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public visibleDeleteModal: boolean = false;
  public visibleAddEditModal: boolean = false;
  public user?: User;
  public form: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });
  public isSubmitting: boolean = false;
  public isValidated: boolean = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe(value => {
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

  openAddEditDialog(user?: User) {
    this.form.reset();
    this.isValidated = false;
    this.visibleAddEditModal = true;
    this.user = user;
  }

  openDeleteDialog(user: User) {
    this.visibleDeleteModal = true;
    this.user = user;
  }

  save() {
    this.isValidated = true;
    if (this.form.invalid) return;
    this.isSubmitting = true;
    if (this.user) {
      this.api.editUser(
        this.user._id, this.form.controls['name'].value,
        this.form.controls['email'].value,
        this.form.controls['password'].value == '' ? undefined : this.form.controls['password'].value
      ).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.dataSource.data[this.dataSource.data.findIndex(x => x._id == this.user?._id)] = value;
          this.dataSource.data = [...this.dataSource.data];
          this.visibleAddEditModal = false;
        }, error: error => this.isSubmitting = false
      });
    } else {
      this.api.addUser(
        this.form.controls['name'].value,
        this.form.controls['email'].value,
        this.form.controls['password'].value
      ).subscribe({
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
    this.api.deleteUser(this.user!._id).subscribe(value => {
      this.isSubmitting = false;
      this.visibleDeleteModal = false;
      let index = this.dataSource.data.findIndex(x => x._id == this.user?._id);
      this.dataSource.data.splice(index, 1)
      this.dataSource.data = [...this.dataSource.data];
    }, error => this.isSubmitting = false);
  }

}

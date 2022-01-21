import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {getStyle} from '@coreui/utils/src';
import {AuthService} from "../services/auth.service";
import {Role} from "../models/role";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public authors: number = 0;
  public types: number = 0;
  public books: number = 0;
  public users: number = 0;

  constructor(
    private auth: AuthService,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.api.getAuthors().subscribe(value => {
      this.authors = value.length;
    });
    this.api.getTypes().subscribe(value => {
      this.types = value.length;
    });
    this.api.getBooks().subscribe(value => {
      this.books = value.length;
    });
    if (this.isAdmin())
      this.api.getUsers().subscribe(value => {
        this.users = value.length;
      });
  }

  isAdmin() {
    return this.auth.currentUserValue.roles.includes(Role.Admin);
  }

}

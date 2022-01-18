import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {SigninComponent} from "./components/signin/signin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthorsComponent} from "./components/authors/authors.component";
import {TypesComponent} from "./components/types/types.component";
import {BooksComponent} from "./components/books/books.component";
import {UsersComponent} from "./components/users/users.component";
import {AuthGuard} from "./services/auth.guard";
import {Role} from "./models/role";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'authors',
        component: AuthorsComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin, Role.Employee]}
      },
      {
        path: 'types',
        component: TypesComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin, Role.Employee]}
      },
      {
        path: 'books',
        component: BooksComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin, Role.Employee]}
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.Admin]}
      },
    ]
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      title: 'Login Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

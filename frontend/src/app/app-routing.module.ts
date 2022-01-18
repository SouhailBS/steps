import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import {SigninComponent} from "./components/signin/signin.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthorsComponent} from "./components/authors/authors.component";
import {TypesComponent} from "./components/types/types.component";
import {BooksComponent} from "./components/books/books.component";
import {UsersComponent} from "./components/users/users.component";

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
        component: DashboardComponent
      },
      {
        path: 'authors',
        component: AuthorsComponent
      },
      {
        path: 'types',
        component: TypesComponent
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
    ]
  },
  {
    path: 'login',
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

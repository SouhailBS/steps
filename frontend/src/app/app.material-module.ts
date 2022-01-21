import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  exports: [
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
  ]
})
export class AppMaterialModule {}

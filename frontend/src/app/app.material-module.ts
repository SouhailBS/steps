import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {CdkTableModule} from "@angular/cdk/table";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  exports: [
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
  ]
})
export class AppMaterialModule {}

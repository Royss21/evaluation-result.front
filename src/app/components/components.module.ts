import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchGlobalComponent } from './table/search-global/search-global.component';
import { SharedModule } from '@shared/modules/shared.module';



@NgModule({
  declarations: [
    TableComponent,
    SearchGlobalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TableComponent,
    SearchGlobalComponent
  ]
})
export class ComponentsModule { }

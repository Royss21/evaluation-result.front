import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchGlobalComponent } from './table/search-global/search-global.component';
import { SharedModule } from '@shared/modules/shared.module';
import { UploadFileComponent } from './upload-file/upload-file.component';



@NgModule({
  declarations: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent
  ]
})
export class ComponentsModule { }

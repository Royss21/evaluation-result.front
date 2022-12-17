import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';
import { SharedModule } from '@shared/modules/shared.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CardOptionComponent } from './card-option/card-option.component';
import { SearchGlobalComponent } from './table/search-global/search-global.component';

@NgModule({
  declarations: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent,
    CardOptionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent,
    CardOptionComponent
  ]
})
export class ComponentsModule { }

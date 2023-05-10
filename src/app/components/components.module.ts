import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';
import { SharedModule } from '@shared/shared.module';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CardOptionComponent } from './card-option/card-option.component';
import { SearchGlobalComponent } from './table/search-global/search-global.component';
import { StatusChipComponent } from './status-chip/status-chip.component';
import { InfoCollaboratorComponent } from './info-collaborator/info-collaborator.component';

@NgModule({
  declarations: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent,
    CardOptionComponent,
    StatusChipComponent,
    InfoCollaboratorComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    TableComponent,
    SearchGlobalComponent,
    UploadFileComponent,
    CardOptionComponent,
    StatusChipComponent,
    InfoCollaboratorComponent,
  ],
})
export class ComponentsModule {}

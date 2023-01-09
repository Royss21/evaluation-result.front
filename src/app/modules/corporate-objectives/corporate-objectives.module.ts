import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateObjectivesListComponent } from './pages/corporate-objectives-list/corporate-objectives-list.component';
import { RouterModule } from '@angular/router';
import { CorporateObjectivesRoutingModule } from './corporate-objectives.routing';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { CorporateObjectivesModalComponent } from './components/corporate-objectives-modal/corporate-objectives-modal.component';



@NgModule({
  declarations: [
    CorporateObjectivesListComponent,
    CorporateObjectivesModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CorporateObjectivesRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  exports:[
    CorporateObjectivesListComponent
  ]
})
export class CorporateObjectivesModule { }

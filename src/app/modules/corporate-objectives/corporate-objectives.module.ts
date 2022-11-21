import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateObjectivesListComponent } from './pages/corporate-objectives-list/corporate-objectives-list.component';
import { RouterModule } from '@angular/router';
import { CorporateObjectivesRoutingModule } from './corporate-objectives.routing';



@NgModule({
  declarations: [
    CorporateObjectivesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CorporateObjectivesRoutingModule
  ],
  exports:[
    CorporateObjectivesListComponent
  ]
})
export class CorporateObjectivesModule { }

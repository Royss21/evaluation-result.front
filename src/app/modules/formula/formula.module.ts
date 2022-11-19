import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaRoutingModule } from './formula.routing';
import { RouterModule } from '@angular/router';

import { FormulaComponent } from './formula.component';
import { FormulaListComponent } from './pages/formula-list/formula-list.component';
import { FormulaModalComponent } from './components/formula-modal/formula-modal.component';
import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';



@NgModule({
  declarations: [
    FormulaComponent,
    FormulaListComponent,
    FormulaModalComponent,
  ],
  imports: [
    CommonModule,
    FormulaRoutingModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
    FormulaComponent,
    FormulaListComponent,
    FormulaModalComponent,
  ]
})
export class FormulaModule { }

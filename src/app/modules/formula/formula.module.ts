import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaRoutingModule } from './formula.routing';
import { RouterModule } from '@angular/router';

import { FormulaComponent } from './formula.component';
import { FormulaListComponent } from './pages/formula-list/formula-list.component';
import { FormulaEditComponent } from './pages/formula-edit/formula-edit.component';



@NgModule({
  declarations: [
    FormulaComponent,
    FormulaListComponent,
    FormulaEditComponent,
  ],
  imports: [
    CommonModule,
    FormulaRoutingModule,
    RouterModule
  ],
  exports: [
    FormulaComponent,
    FormulaListComponent,
    FormulaEditComponent,
  ]
})
export class FormulaModule { }

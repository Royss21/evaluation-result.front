import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaRoutingModule } from './formula.routing';

import { FormulaComponent } from './formula.component';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from '@components/components.module';
import { FormulaListComponent } from './pages/formula-list/formula-list.component';
import { FormulaModalComponent } from './components/formula-modal/formula-modal.component';

@NgModule({
  declarations: [
    FormulaComponent,
    FormulaListComponent,
    FormulaModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    FormulaRoutingModule
  ],
  exports: [
    FormulaComponent,
    FormulaListComponent,
    FormulaModalComponent,
  ]
})
export class FormulaModule { }

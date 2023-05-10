import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulaComponent } from './formula.component';
import { FormulaListComponent } from './pages/formula-list/formula-list.component';

export const roots: Routes = [
  {
    path: '',
    component: FormulaComponent,
    children: [
      {
        path: '',
        component: FormulaListComponent,
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(roots)],
  exports: [RouterModule],
})
export class FormulaRoutingModule {}

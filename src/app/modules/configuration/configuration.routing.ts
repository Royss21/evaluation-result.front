import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ConfigurationComponent } from './configuration.component'
import { OptionComponent } from "./views/option/option.component";

export const roots: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path:'',
        component: OptionComponent
      },
      {
        path:'formula',
        loadChildren: () => import('../formula/formula.module').then( m => m.FormulaModule )
      },
      {
        path:'level',
        loadChildren: () => import('../level/level.module').then( m => m.LevelModule )
      },
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports:[ RouterModule.forChild( roots ) ],
  exports:[ RouterModule ]
})
export class ConfigurationRoutingModule { }

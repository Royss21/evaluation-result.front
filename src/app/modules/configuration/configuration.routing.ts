import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OptionComponent } from "./views/option/option.component";
import { ConfigurationComponent } from './configuration.component'

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
        path:'parameter-range',
        loadChildren: () => import('../parameter-range/parameter-range.module').then( m => m.ParameterRangeModule )
      },
      {
        path:'corporate-objectives',
        loadChildren: () => import('../corporate-objectives/corporate-objectives.module').then( m => m.CorporateObjectivesModule )
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

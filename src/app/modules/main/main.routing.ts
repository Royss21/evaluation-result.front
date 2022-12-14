import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { MainComponent } from "./main.component";

import { WelcomComponent } from "./views/welcom/welcom.component";

export const roots: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path:'',
        component: WelcomComponent
      },
      {
        path:'period',
        loadChildren: () => import('../period/period.module').then( m => m.PeriodModule )
      },
      {
        path:'evaluation',
        loadChildren: () => import('../evaluation/evaluation.module').then( m => m.EvaluationModule )
      },
      {
        path:'configuration',
        loadChildren: () => import('../configuration/configuration.module').then( m => m.ConfigurationModule )
      },
      {
        path:'evaluation/:evaluationId/leader',
        loadChildren: () => import('../evaluation-leader/leader.module').then( m => m.LeaderModule )
      },
      {
        path:'evaluation/:evaluationId/collaborator',
        loadChildren: () => import('../evaluation-collaborator/evaluation-collaborator.module').then( m => m.EvaluationCollaboratorModule )
      },
      {
        path:'evaluation/:evaluationId/evaluate-component/:componentId',
        loadChildren: () => import('../evaluate-component/evaluate.module').then( m => m.EvaluateComponentModule )
      },
      // {
      //   path:'security',
      //   loadChildren: () => import('../seguridad/seguridad.module').then( m => m.SeguridadModule )
      // },
      {
        path:'',
        redirectTo:'',
        pathMatch: 'full'
      },
      {
        path:'**',
        component: PageNotFoundComponent
      },
    ]
  }
];

@NgModule({
  imports:[ RouterModule.forChild( roots ) ],
  exports:[ RouterModule ]
})
export class MainRoutingModule { }

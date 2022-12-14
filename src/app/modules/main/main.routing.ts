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
        path:'welcome',
        component: WelcomComponent  
      },
      // {
      //   path:'maintenance',
      //   loadChildren: () => import('../mantenimiento/mantenimiento.module').then( m => m.MantenimientoModule )
      // },
      // {
      //   path:'security',
      //   loadChildren: () => import('../seguridad/seguridad.module').then( m => m.SeguridadModule )
      // },
      { 
        path:'',
        redirectTo:'welcome',
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
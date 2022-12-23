import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HierarchyComponent } from '@modules/hierarchy/hierarchy.component';
import { HierarchyListComponent } from '@modules/hierarchy/pages/hierarchy-list/hierarchy-list.component';

const routes: Routes = [
  {
    path: '',
    component: HierarchyComponent,
    children: [
      {
        path:'',
        component: HierarchyListComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HierarchyRoutingModule { }

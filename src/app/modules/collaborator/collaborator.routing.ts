import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorComponent } from '@modules/collaborator/collaborator.component';
import { CollaboratorListComponent } from '@modules/collaborator/pages/collaborator-list/collaborator-list.component';

const routes: Routes = [
  {
    path: '',
    component: CollaboratorComponent,
    children: [
      {
        path: '',
        component: CollaboratorListComponent
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
export class CollaboratorRoutingModule { }

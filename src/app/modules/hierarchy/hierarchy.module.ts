import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HierarchyComponent } from './hierarchy.component';
import { HierarchyRoutingModule } from './hierarchy.routing';
import { SharedModule } from '@shared/modules/shared.module';
import { ComponentsModule } from '@components/components.module';
import { HierarchyModalComponent } from './components/hierarchy-modal/hierarchy-modal.component';
import { HierarchyListComponent } from '@modules/hierarchy/pages/hierarchy-list/hierarchy-list.component';

@NgModule({
  declarations: [
    HierarchyComponent,
    HierarchyListComponent,
    HierarchyModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    HierarchyRoutingModule
  ]
})
export class HierarchyModule { }

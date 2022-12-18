import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HierarchyRoutingModule } from './hierarchy.routing';
import { HierarchyComponent } from './hierarchy.component';


@NgModule({
  declarations: [
    HierarchyComponent
  ],
  imports: [
    CommonModule,
    HierarchyRoutingModule
  ]
})
export class HierarchyModule { }

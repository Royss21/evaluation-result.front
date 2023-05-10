import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuditEntityRouting } from './audit-entity.routing';
import { AuditEntityComponent } from './audit-entity.component';
import { ComponentsModule } from '@components/components.module';
import { AuditEntityListComponent } from './pages/audit-entity-list/audit-entity-list.component';
import { ShowValueComponent } from './components/show-value/show-value.component';
import { SharedPipesModule } from '@shared/pipes/shared-pipes.module';

@NgModule({
  declarations: [
    AuditEntityComponent,
    AuditEntityListComponent,
    ShowValueComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    SharedPipesModule,
    AuditEntityRouting,
  ],
})
export class AuditEntityModule {}

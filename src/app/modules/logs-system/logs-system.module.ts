import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { LogsSystemComponent } from './logs-system.component';
import { ComponentsModule } from '@components/components.module';
import { SharedPipesModule } from '@shared/pipes/shared-pipes.module';
import { LogsSystemRouting } from '@modules/logs-system/logs-system.routing';
import { LogsSystemListComponent } from './views/logs-system-list/logs-system-list.component';
import { ShowInfoLogComponent } from './components/show-info-log/show-info-log.component';

@NgModule({
  declarations: [
    LogsSystemComponent,
    LogsSystemListComponent,
    ShowInfoLogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    SharedPipesModule,
    LogsSystemRouting
  ]
})
export class LogsSystemModule { }

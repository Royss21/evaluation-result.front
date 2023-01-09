import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing';
import { SharedModule } from "@shared/shared.module";

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { WelcomComponent } from './views/welcom/welcom.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    WelcomComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    WelcomComponent
  ]
})
export class MainModule { }

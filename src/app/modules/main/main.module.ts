import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainComponent } from './main.component';
import { WelcomComponent } from './views/welcom/welcom.component';
import { MainRoutingModule } from './main.routing';

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
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatCardModule
  ],
  exports: [  
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    WelcomComponent
  ]
})
export class MainModule { }

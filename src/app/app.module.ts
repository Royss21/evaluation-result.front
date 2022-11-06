import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginationEs } from './app.helpers';

import { SharedModule } from '@shared/modules/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupChooseComponent } from './components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PopupChooseComponent,
    PopupConfirmComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-PE'
    },
    {
      provide: MatPaginatorIntl,
      useValue: getPaginationEs()
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthorizationInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true
    // },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    },
  ],
  entryComponents: [PopupChooseComponent, PopupConfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

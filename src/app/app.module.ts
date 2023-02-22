import { AppRoutingModule } from './app.routing';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { getPaginationEs } from './app.helpers';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { SharedModule } from '@shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupChooseComponent } from './components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { CorporateObjectivesComponent } from './modules/corporate-objectives/corporate-objectives.component';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PopupChooseComponent,
    PopupConfirmComponent,
    CorporateObjectivesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NgxMaskModule.forRoot(),
    FlexLayoutModule,
    BrowserAnimationsModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
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

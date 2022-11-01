import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppComponent } from './app.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginationEs } from './app.helpers';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
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
  bootstrap: [AppComponent]
})
export class AppModule { }

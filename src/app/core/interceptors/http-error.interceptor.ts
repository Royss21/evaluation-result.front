import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConstantsGeneral } from '@shared/constants';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private _dialog: MatDialog,
        private _loader: SpinnerVisibilityService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(() => this._loader.hide()),
            tap(
                (response) => {
                  if (response instanceof HttpResponse && response.ok) {
                      if(!(response.body instanceof Blob))
                        if (!response.body.ok)
                            this.showMessage(response.body.message);
                    }
                },
                (error: HttpErrorResponse) => {
                    console.log(error)

                    if (error.error instanceof Blob) {
                        const reader = new FileReader();
                        reader.onload = (e: Event) => {
                            const errmsg = JSON.parse((<any>e.target).result);
                            this.showMessage(errmsg.message);
                        };
                        reader.readAsText(error.error);
                    }
                    // else if (error.error?.codigoEstado === 401)
                    //     this.mostrarMensajeSessionExpirado();
                    else if (error.error?.message && !error.error.ok)
                        this.showMessage(error.error.message, error.error.warning);
                    else
                        this.showMessage('Ha ocurrido un error en el servidor');
                }
            )
        );
    }

    private showMessage(mensaje: string, warning = false): void {
      const dataPopup = { ...ConstantsGeneral.confirmCreatePopup };
      dataPopup.iconColor = 'color-danger';
      dataPopup.icon = 'highlight_off'

      dataPopup.text = mensaje;
      const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
        data: dataPopup,
        autoFocus: false
      });

      dialogRefConfirm.afterClosed().subscribe(() => {});
    }

    // private showMessageSessionExpired(): void {
    //     const dialogRefConfirm = this._dialog.open(PopupNotificacionComponent, {
    //         data: {
    //             icon: 'check_circle',
    //             iconColor: 'color-primary',
    //             text: 'No tiene acceso a la pantalla solicitada o su sesión ya expiró',
    //             buttonLabelAccept: 'Aceptar'
    //         },
    //         autoFocus: false
    //     });

    //     dialogRefConfirm.afterClosed().subscribe(() => {
    //         this.authService.logout();
    //         this.router.navigate(['/login']);
    //     });
    // }
}

// import { Injectable } from '@angular/core';
// import { Route, Router } from '@angular/router';
// import {
//     HttpEvent,
//     HttpInterceptor,
//     HttpHandler,
//     HttpRequest,
//     HttpErrorResponse,
//     HttpResponse
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { PopupNotificacionComponent } from '../../components/popup-notificacion/popup-notificacion.component';
// import { IPopupNotificacion } from '../../components/popup-notificacion/interface/popup-notificacion.interface';
// import { SpinnerVisibilityService } from 'ng-http-loader';
// import { PopupNotificacionService } from 'src/app/components/popup-notificacion/service/popup-notificacion.service';

// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//     constructor(
//         private _dialog: MatDialog,
//         private _loader: SpinnerVisibilityService,
//         private _popupNotificacion: PopupNotificacionService
//     ) {}

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(
//             tap(() => this._loader.hide()),
//             tap(
//                 (response) => {
//                     if (response instanceof HttpResponse && response.ok) {
//                         if (!response.body.ok)
//                             this.mostrarMensaje(response.body.message);
//                     }
//                 },
//                 (error: HttpErrorResponse) => {
//                     if (error.error instanceof Blob) {
//                         const reader = new FileReader();
//                         reader.onload = (e: Event) => {
//                             const errmsg = JSON.parse((<any>e.target).result);
//                             this.mostrarMensaje(errmsg.message);
//                         };
//                         reader.readAsText(error.error);
//                     }
//                     else if (error.error?.codigoEstado === 401)
//                         this.mostrarMensajeSessionExpirado();
//                     else if (error.error?.mensaje && !error.error.ok)
//                         this.mostrarMensaje(error.error.mensaje, error.error.warning);
//                     else
//                         this.mostrarMensaje('Ha ocurrido un error en el servidor');
//                 }
//             )
//         );
//     }

//     private showMessage(mensaje: string, warning = false): void {
//         this._popupNotificacion.mostrar({
//             data: {
//                 icono: 'error',
//                 iconoColor: 'color-danger',
//                 texto: mensaje,
//                 textoBotonAceptar: 'Aceptar',
//                 titulo: 'Error !!'
//             } as IPopupNotificacion
//         } as MatDialogConfig)
//     }

//     private showMessageSessionExpired(): void {
//         const dialogRefConfirm = this._dialog.open(PopupNotificacionComponent, {
//             data: {
//                 icon: 'check_circle',
//                 iconColor: 'color-primary',
//                 text: 'No tiene acceso a la pantalla solicitada o su sesión ya expiró',
//                 buttonLabelAccept: 'Aceptar'
//             },
//             autoFocus: false
//         });

//         // dialogRefConfirm.afterClosed().subscribe(() => {
//         //     this.authService.logout();
//         //     this.router.navigate(['/login']);
//         // });
//     }
// }

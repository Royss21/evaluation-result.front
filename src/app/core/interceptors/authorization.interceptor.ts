import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private _loader: SpinnerVisibilityService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    this._loader.show();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }});

    return next.handle(authReq);
  }
}

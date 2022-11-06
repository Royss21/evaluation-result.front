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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM4NjMyNDYsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJ0b2tlbk5hbWUiLCJpZGVudGlmaWNhdGUiOiIrUkplbDBZUUxKRFlGdU83WXFHUjNCNmtKSmo0MVlOZDhvSVRuWHJGWnc3QzV6a2h1bjducVhHWXM1aURNUTdMIiwiZnVsbE5hbWUiOiJ5MGc1RFNYUjNTVnRmRlNqeE1FVG84aTY0L0JwUXZOVDdta1lJMll6aGdJPSIsInVzZXJOYW1lIjoiQ2VJVWVjTEdHSHI1dWtUWGFOaGNkdz09Iiwicm9sZSI6ImVkN1NDYjYyVGF6VWFRRTBoc2UxYlo3bUZ2MmV6UlUwRDJyY1NKczFaNGlyTW5IQWxGRnR5ZUE2NG9sOU5BOXAiLCJjb21wYW55IjoiTEMxYnpsNlgyYkxoL0NwTGFBK2poYXBEOE1lNkRKNWkwZW9oT3hTTWwrVnhWR1E3cUg1NEo2aXVzVkszUTlJcyIsIm5iZiI6MTY2Mzg2MzI0NiwiZXhwIjoxNjYzOTQ2MDQ2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwLyJ9.n9BBVYDwmxXeW0MtBLbIyTi4yGOliYLz3OL_yivi1Q4`
    }});

    return next.handle(authReq);
  }
}

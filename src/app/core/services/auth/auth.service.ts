import { Injectable } from '@angular/core';
import { ILogin } from '@auth/interfaces/login.interface';
import { IRefreshToken, IToken } from '@auth/interfaces/token.interface';
import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = `${environment.serverUriApi}/authentication`;

  constructor(private _apiService: ApiService) { }

  validateUser(username: string): Observable<any> {
    return this._apiService.get<any>(`${this._url}/validate-user/${username}`);
  }

  loginSession(request: ILogin): Observable<IToken> {
    return this._apiService.post<IToken>(`${this._url}/login-session`, request);
  }

  refreshToken(request: IRefreshToken): Observable<IToken> {
    return this._apiService.post<IToken>(`${this._url}/refresh-token`, request);
  }

}

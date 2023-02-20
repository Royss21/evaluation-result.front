import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { IConductBySubcomponent } from '@shared/interfaces/conduct.interface';

@Injectable({
  providedIn: 'root'
})
export class ConductService {

  private _url = `${environment.serverUriApi}/conduct`;

  constructor(
    private _apiService: ApiService,
  ) { }

  create(request: IConductBySubcomponent): Observable<IConductBySubcomponent> {
    return this._apiService.post<IConductBySubcomponent>(`${this._url}`, request);
  }

  update(request: IConductBySubcomponent): Observable<IConductBySubcomponent> {
    return this._apiService.put<IConductBySubcomponent>(`${this._url}`, request);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  conductBySubcomponent(id: string): Observable<IConductBySubcomponent[]> {
    return this._apiService.get<IConductBySubcomponent[]>(`${this._url}/get-all/subcomponent/${id}`);
  }

}

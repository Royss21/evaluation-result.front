import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { ISubcomponentValue } from '@shared/interfaces/subcomponent-value.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcomponentValueService {

  private _url = `${environment.serverUriApi}/subcomponent-value`;

  constructor(private _apiService: ApiService) { }

  getAll(subComponentId: string): Observable<ISubcomponentValue[]> {
    const url = `${this._url}/get-all/subcomponent/${subComponentId}`
    return this._apiService.get<ISubcomponentValue[]>(url);
  }

  create(request: ISubcomponentValue): Observable<ISubcomponentValue> {
    return this._apiService.post<ISubcomponentValue>(`${this._url}`, request);
  }

  update(request: ISubcomponentValue): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${id}`);
  }
}

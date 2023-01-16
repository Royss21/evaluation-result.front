import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ISubcomponentFilter } from '@shared/interfaces/subcomponent-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcomponentService {

  private _url = `${environment.serverUriApi}/subcomponent`;

  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<ISubcomponent> {
    const url = `${this._url}/${id}`;
    return this._apiService.get<ISubcomponent>(url);
  }

  getAll(): Observable<ISubcomponent[]> {
    return this._apiService.get<ISubcomponent[]>(this._url);
  }

  create(request: ISubcomponent): Observable<ISubcomponent> {
    return this._apiService.post<ISubcomponent>(`${this._url}`, request);
  }

  update(request: ISubcomponent): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(paginatedFilter: ISubcomponentFilter): Observable<IPaginatedResponse<ISubcomponent>> {
     return this._apiService
         .get<IPaginatedResponse<ISubcomponent>>(`${this._url}/paging`, paginatedFilter);
  }
}

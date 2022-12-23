import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { environment } from 'src/environments/environment';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  private _url = `${environment.serverUriApi}/hierarchy`

  constructor(
    private _apiService: ApiService
  ) { }

  getAll(): Observable<IHierarchy[]> {
    return this._apiService.get<IHierarchy[]>(this._url);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IHierarchy>> {
    return this._apiService
        .get<IPaginatedResponse<IHierarchy>>(`${this._url}/paging`, paginatedFilter);
  }

  create(request: IHierarchy): Observable<IHierarchy> {
    return this._apiService.post<IHierarchy>(`${this._url}`, request);
  }

  update(request: IHierarchy): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${id}`);
  }

  getById(id: number): Observable<IHierarchy> {
    const url = `${this._url}/${id}`;
    return this._apiService.get<IHierarchy>(url);
  }
}

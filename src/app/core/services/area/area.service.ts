import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IArea } from '@modules/area/interfaces/area.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private controller = 'area';
  private _url = `${environment.serverUriApi}/area`;

  constructor(private _apiService: ApiService) {}

  getById(id: number): Observable<IArea> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IArea>(url);
  }

  getAll(): Observable<IArea[]> {
    return this._apiService.get<IArea[]>(this._url);
  }

  getByIdGerency(gerencyId: number): Observable<IArea[]> {
    return this._apiService.get<IArea[]>(
      `${this._url}/by-gerency/${gerencyId}`
    );
  }

  create(request: IArea): Observable<IArea> {
    return this._apiService.post<IArea>(`${this._url}`, request);
  }

  update(request: IArea): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IArea>> {
    return this._apiService.get<IPaginatedResponse<IArea>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private _url = `${environment.serverUriApi}/level`;
  constructor(private _apiService: ApiService) {}

  getById(id: number): Observable<ILevel> {
    const url = `${this._url}/${id}`;
    return this._apiService.get<ILevel>(url);
  }

  getAll(): Observable<ILevel[]> {
    return this._apiService.get<ILevel[]>(this._url);
  }

  create(request: ILevel): Observable<ILevel> {
    return this._apiService.post<ILevel>(`${this._url}`, request);
  }

  update(request: ILevel): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<ILevel>> {
    return this._apiService.get<IPaginatedResponse<ILevel>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }
}

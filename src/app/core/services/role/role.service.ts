import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IRole } from '@modules/role/interfaces/role.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private _url = `${environment.serverUriApi}/role`;

  constructor(private _apiService: ApiService) {}

  getAll(): Observable<IRole[]> {
    return this._apiService.get<IRole[]>(`${this._url}`);
  }

  getPaginated(
    paginatedFilter: IPaginatedFilter
  ): Observable<IPaginatedResponse<IRole>> {
    return this._apiService.get<IPaginatedResponse<IRole>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }

  create(request: IRole): Observable<IRole> {
    return this._apiService.post<IRole>(`${this._url}`, request);
  }

  update(request: IRole): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }
}

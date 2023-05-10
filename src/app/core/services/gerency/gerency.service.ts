import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class GerencyService {
  private _url = `${environment.serverUriApi}/gerency`;

  constructor(private _apiService: ApiService) {}

  getAll(): Observable<IGerency[]> {
    return this._apiService.get<IGerency[]>(`${this._url}`);
  }

  getPaginated(
    paginatedFilter: IPaginatedFilter
  ): Observable<IPaginatedResponse<IGerency>> {
    return this._apiService.get<IPaginatedResponse<IGerency>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }

  create(request: IGerency): Observable<IGerency> {
    return this._apiService.post<IGerency>(`${this._url}`, request);
  }

  update(request: IGerency): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private controller = 'Period';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(private _apiService: ApiService) { }

  getPeriodById(id: number) {
    const url = `${this.controller}/id`;
    return this._apiService.get<boolean>(url);
  }

  create(request: IPeriod): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}`, request);
  }

  delete(idPeriod: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${idPeriod}`);
  }

  getPaginated(paginatedFilter: IPaginatedFilter): Observable<IPaginatedResponse<IPeriod>> {
    return this._apiService
        .get<IPaginatedResponse<IPeriod>>(`${this.url}/paging`, paginatedFilter);
  }
}

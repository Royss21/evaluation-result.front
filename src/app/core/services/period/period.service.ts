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
  constructor(private _apiService: ApiService) { }

  getPeriodById(id: number) {
    const url = `${this.controller}/id`;
    return this._apiService.get<boolean>(url);
  }

  create(request: IPeriod) {
    const url = `${this.controller}`;
    return this._apiService.post<boolean>(`https://localhost:7253/api/${url}`, request);
  }

  getPaginated(paginatedFilter: IPaginatedFilter): Observable<IPaginatedResponse<IPeriod>> {
    const url = `${this.controller}/paging`
    return this._apiService
        .get<IPaginatedResponse<IPeriod>>(`https://localhost:7253/api/${url}`, paginatedFilter);
  }
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private controller = 'period';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(private _apiService: ApiService) { }

  getPeriodById(id: number) {
    const url = `${this.controller}/id`;
    return this._apiService.get<boolean>(url);
  }

  create(request: IPeriod): Observable<IPeriod> {
    return this._apiService.post<IPeriod>(`${this._url}`, request);
  }

  update(request: IPeriod): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(idPeriod: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${idPeriod}`);
  }

  getPaginated(paginatedFilter: IPaginatedFilter): Observable<IPaginatedResponse<IPeriod>> {
    return this._apiService
        .get<IPaginatedResponse<IPeriod>>(`${this._url}/paging`, paginatedFilter);
  }

  getInProgress(): Observable<IPeriodEvaluation> {
    return this._apiService.get<IPeriodEvaluation>(`${this._url}/in-progress`);
  }

  getCurrentDatePeriod(): Observable<IPeriod> {
    return this._apiService.get<IPeriod>(`${this._url}/current-dates`);
  }

}

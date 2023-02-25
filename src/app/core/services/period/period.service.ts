import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { environment } from 'src/environments/environment';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private _url = `${environment.serverUriApi}/period`;
  constructor(private _apiService: ApiService) { }

  getPeriodById(id: number) {
    const url = `${this._url}/id`;
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

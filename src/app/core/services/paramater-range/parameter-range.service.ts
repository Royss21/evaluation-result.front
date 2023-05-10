import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IParameterRangeWithValues } from '@modules/parameter-range/interfaces/parameter-range-with-values.interface';
import { IParameterRange } from '@modules/parameter-range/interfaces/parameter-range.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ParameterRangeService {
  private controller = 'parameter-range';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(private _apiService: ApiService) {}

  getById(id: number): Observable<IParameterRange> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IParameterRange>(url);
  }

  getAllWithValues(): Observable<IParameterRangeWithValues[]> {
    return this._apiService.get<IParameterRangeWithValues[]>(
      `${this._url}/get-all-values`
    );
  }

  create(request: IParameterRange): Observable<IParameterRange> {
    return this._apiService.post<IParameterRange>(`${this._url}`, request);
  }

  update(request: IParameterRange): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<IParameterRange>> {
    return this._apiService.get<IPaginatedResponse<IParameterRange>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }
}

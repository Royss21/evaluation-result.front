import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IParameterValueFilter } from '@modules/parameter-range/helpers/parameter-value-filter.interface';
import { IParameterValue } from '@modules/parameter-range/interfaces/parameter-value.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ParameterValueService {

  private controller = 'ParameterValue';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<IParameterValue> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IParameterValue>(url);
  }

  getAll(): Observable<IParameterValue[]> {
    const url = `${this.controller}`;
    return this._apiService.get<IParameterValue[]>(url);
  }

  create(request: IParameterValue): Observable<IParameterValue> {
    return this._apiService.post<IParameterValue>(`${this.url}`, request);
  }

  update(request: IParameterValue): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: IParameterValueFilter): Observable<IPaginatedResponse<IParameterValue>> {    
     return this._apiService
         .get<IPaginatedResponse<IParameterValue>>(`${this.url}/paging`, paginatedFilter);
  }
}

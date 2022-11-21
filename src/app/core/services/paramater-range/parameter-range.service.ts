import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IParameterRangeWithValues } from '@modules/parameter-range/interfaces/parameter-range-with-values.interface';
import { IParameterRange } from '@modules/parameter-range/interfaces/parameter-range.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ParameterRangeService {

  private controller = 'ParameterRange';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<IParameterRange> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IParameterRange>(url);
  }

  getAllWithValues(): Observable<IParameterRangeWithValues[]> {
    return this._apiService.get<IParameterRangeWithValues[]>(`${this.url}/GetAllWithValues`);
  }

  create(request: IParameterRange): Observable<IParameterRange> {
    return this._apiService.post<IParameterRange>(`${this.url}`, request);
  }

  update(request: IParameterRange): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IParameterRange>> {    
     return this._apiService
         .get<IPaginatedResponse<IParameterRange>>(`${this.url}/paging`, paginatedFilter);
  }
}

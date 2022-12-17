
import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ICorporateObjectives } from '@modules/corporate-objectives/interfaces/corporate-objectives.interface';
import { ISubcomponentFilter } from '@shared/interfaces/subcomponent-filter.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SubcomponentService {
  
  private controller = 'subcomponent';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<ICorporateObjectives> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<ICorporateObjectives>(url);
  }

  getAll(): Observable<ICorporateObjectives[]> {
    const url = `${this.controller}`;
    return this._apiService.get<ICorporateObjectives[]>(url);
  }

  create(request: ICorporateObjectives): Observable<ICorporateObjectives> {
    return this._apiService.post<ICorporateObjectives>(`${this.url}`, request);
  }

  update(request: ICorporateObjectives): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: ISubcomponentFilter): Observable<IPaginatedResponse<ICorporateObjectives>> {    
     return this._apiService
         .get<IPaginatedResponse<ICorporateObjectives>>(`${this.url}/paging`, paginatedFilter);
  }
}

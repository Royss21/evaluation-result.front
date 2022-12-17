import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  
  private controller = 'formula';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
   ) { }

  getById(id: number): Observable<IFormula> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IFormula>(url);
  }

  getAll(): Observable<IFormula[]> {
    return this._apiService.get<IFormula[]>(this.url);
  }

  create(request: IFormula): Observable<IFormula> {
    return this._apiService.post<IFormula>(`${this.url}`, request);
  }

  update(request: IFormula): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IFormula>> {
     return this._apiService
         .get<IPaginatedResponse<IFormula>>(`${this.url}/paging`, paginatedFilter);
  }
}

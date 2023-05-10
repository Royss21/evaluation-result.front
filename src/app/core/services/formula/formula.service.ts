import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  private controller = 'formula';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(private _apiService: ApiService) {}

  getById(id: number): Observable<IFormula> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IFormula>(url);
  }

  getAll(): Observable<IFormula[]> {
    return this._apiService.get<IFormula[]>(this._url);
  }

  create(request: IFormula): Observable<IFormula> {
    return this._apiService.post<IFormula>(`${this._url}`, request);
  }

  update(request: IFormula): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  validAssigned(id: string): Observable<boolean> {
    return this._apiService.get<boolean>(
      `${this._url}/validate-assigned/${id}`
    );
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IFormula>> {
    return this._apiService.get<IPaginatedResponse<IFormula>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }
}

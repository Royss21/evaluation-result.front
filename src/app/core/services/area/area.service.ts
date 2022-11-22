
import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IArea } from '@modules/area/interfaces/area.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  
  private controller = 'Area';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<IArea> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IArea>(url);
  }

  getAll(): Observable<IArea[]> {
    return this._apiService.get<IArea[]>(this.url);
  }

  create(request: IArea): Observable<IArea> {
    return this._apiService.post<IArea>(`${this.url}`, request);
  }

  update(request: IArea): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IArea>> {    
     return this._apiService
         .get<IPaginatedResponse<IArea>>(`${this.url}/paging`, paginatedFilter);
  }
}

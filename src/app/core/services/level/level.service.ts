import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IResponse } from '@core/interfaces/response.interface';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  
  private controller = 'Level';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService,
    private _httpClient: HttpClient
    ) { }

  getById(id: number): Observable<ILevel> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<ILevel>(url);
  }

  getAll(): Observable<ILevel[]> {
    const url = `${this.controller}`;
    return this._apiService.get<ILevel[]>(url);
  }

  create(request: ILevel): Observable<ILevel> {
    return this._apiService.post<ILevel>(`${this.url}`, request);
  }

  update(request: ILevel): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<ILevel>> {
    

    //return this._httpClient.get<IPaginatedResponse<ILevel>>(`https://localhost:7253/api/Level/paging?start=1&rows=5&columnsOrder=CreateDate&typeOrder=1&globalFilter=b`)
    
     return this._apiService
         .get<IPaginatedResponse<ILevel>>(`${this.url}/paging`, paginatedFilter);
  }
}

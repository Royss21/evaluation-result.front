import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ILeaderPaged } from '@modules/leader/interfaces/leader-paged.interface';
import { IEvaluationLeader } from '@modules/leader/interfaces/leader.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  private controller = 'EvaluationLeader';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<IEvaluationLeader> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IEvaluationLeader>(url);
  }

  getAll(): Observable<IEvaluationLeader[]> {
    const url = `${this.controller}`;
    return this._apiService.get<IEvaluationLeader[]>(url);
  }

  create(request: IEvaluationLeader): Observable<IEvaluationLeader> {
    return this._apiService.post<IEvaluationLeader>(`${this.url}`, request);
  }

  update(request: IEvaluationLeader): Observable<boolean> {
    return this._apiService.put<boolean>(`${this.url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<ILeaderPaged>> {    
     return this._apiService
         .get<IPaginatedResponse<ILeaderPaged>>(`${this.url}/paging`, paginatedFilter);
  }
}

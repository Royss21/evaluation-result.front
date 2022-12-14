import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ILeaderCollaboratorFilter } from '@modules/evaluation-leader/interfaces/leader-collaborador-filter.interface';
import { ILeaderCollaboratorAssigned } from '@modules/evaluation-leader/interfaces/leader-collaborador.interface';
import { ILeaderImport } from '@modules/evaluation-leader/interfaces/leader-import.interface';
import { ILeaderPaged } from '@modules/evaluation-leader/interfaces/leader-paged.interface';
import { IEvaluationLeader } from '@modules/evaluation-leader/interfaces/leader.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  private controller = 'evaluation-leader';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }

  getById(id: number): Observable<IEvaluationLeader> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IEvaluationLeader>(url);
  }

  getAll(): Observable<IEvaluationLeader[]> {
    return this._apiService.get<IEvaluationLeader[]>(`${this.url}/get-all`);
  }

  getCollaboratorsByLeader(evaluationLiderId: number, parameters: ILeaderCollaboratorFilter): Observable<ILeaderCollaboratorAssigned> {
    return this._apiService.get<ILeaderCollaboratorAssigned>(`${this.url}/${evaluationLiderId}/collaborators`, parameters);
  }

  existsPreviousImport(componentId: number): Observable<boolean> {
    return this._apiService.get<boolean>(`${this.url}/component/${componentId}/exists-previous-import`);
  }

  downloadTemplate(componentId: number): Observable<any> {
    return this._apiService.getBlob(`${this.url}/component/${componentId}/download-template`);
  }

  create(request: IEvaluationLeader): Observable<IEvaluationLeader> {
    return this._apiService.post<IEvaluationLeader>(`${this.url}`, request);
  }

  importLeader(request: ILeaderImport): Observable<any> {
    return this._apiService.post(`${this.url}/import-leaders`, request, true)
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

import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ILeaderCollaboratorFilter } from '@modules/evaluation-leader/interfaces/leader-collaborador-filter.interface';
import { ILeaderCollaboratorAssigned } from '@modules/evaluation-leader/interfaces/leader-collaborador.interface';
import { ILeaderImport } from '@modules/evaluation-leader/interfaces/leader-import.interface';
import { ILeaderPaged } from '@modules/evaluation-leader/interfaces/leader-paged.interface';
import { IEvaluationLeader } from '@modules/evaluation-leader/interfaces/leader.interface';
import { ICollaboratorLeaderEvaluate } from '@modules/evaluation-leader/interfaces/leader.interface copy';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  private controller = 'evaluation-leader';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(private _apiService: ApiService) {}

  getById(id: number): Observable<IEvaluationLeader> {
    const url = `${this.controller}/${id}`;
    return this._apiService.get<IEvaluationLeader>(url);
  }

  getAll(): Observable<IEvaluationLeader[]> {
    return this._apiService.get<IEvaluationLeader[]>(`${this._url}/get-all`);
  }

  getCollaboratorsByLeader(
    evaluationLiderId: number,
    parameters: ILeaderCollaboratorFilter
  ): Observable<ILeaderCollaboratorAssigned> {
    return this._apiService.get<ILeaderCollaboratorAssigned>(
      `${this._url}/${evaluationLiderId}/collaborators`,
      parameters
    );
  }

  getComponentAndStageLeader(
    evaluationCollaboratorId: string
  ): Observable<ICollaboratorLeaderEvaluate> {
    return this._apiService.get<ICollaboratorLeaderEvaluate>(
      `${this._url}/flag/${evaluationCollaboratorId}`
    );
  }

  existsPreviousImport(componentId: number): Observable<boolean> {
    return this._apiService.get<boolean>(
      `${this._url}/component/${componentId}/exists-previous-import`
    );
  }

  downloadTemplate(componentId: number): Observable<any> {
    return this._apiService.getBlob(
      `${this._url}/component/${componentId}/download-template`
    );
  }

  create(request: IEvaluationLeader): Observable<IEvaluationLeader> {
    return this._apiService.post<IEvaluationLeader>(`${this._url}`, request);
  }

  importLeader(request: ILeaderImport): Observable<any> {
    return this._apiService.post(`${this._url}/import-leaders`, request, true);
  }

  update(request: IEvaluationLeader): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<ILeaderPaged>> {
    return this._apiService.get<IPaginatedResponse<ILeaderPaged>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }
}

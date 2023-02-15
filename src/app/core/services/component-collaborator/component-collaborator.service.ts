import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator-evaluate.interface';
import { IComponentCollaboratorPaged } from '@modules/evaluate-component/interfaces/component-collaborator-paged.interface';
import { IComponentCollaborator } from '@modules/evaluate-component/interfaces/component-collaborator.interface';
import { IUpdateStatus } from '@modules/evaluate-component/interfaces/update-status.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentCollaboratorService {

  private controller = 'component-collaborator';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(
    private _apiService: ApiService
   ) { }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IComponentCollaboratorPaged>> {
    return this._apiService
        .get<IPaginatedResponse<IComponentCollaboratorPaged>>(`${this._url}/paging`, paginatedFilter);
  }

  evaluate(request: IComponentCollaboratorEvaluate): Observable<boolean> {
    return this._apiService.post<boolean>(`${this._url}/evaluate`, request);
  }

  updateStatus(request: IUpdateStatus): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}/status`, request);
  }


  getEvaluationData(id: string): Observable<IComponentCollaborator> {
    return this._apiService
        .get<IComponentCollaborator>(`${this._url}/${id}/evaluation-data`);
  }
}

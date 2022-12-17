import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IComponentCollaboratorPaged } from '@modules/evaluate-component/interfaces/component-collaborator-paged.interface';
import { IComponentCollaborator, IComponentCollaboratorEvaluate } from '@modules/evaluate-component/interfaces/component-collaborator.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentCollaboratorService {
  
  private controller = 'component-collaborator';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
   ) { }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IComponentCollaboratorPaged>> {
    return this._apiService
        .get<IPaginatedResponse<IComponentCollaboratorPaged>>(`${this.url}/paging`, paginatedFilter);
  }

  evaluate(request: IComponentCollaboratorEvaluate): Observable<boolean> {
    return this._apiService.post<boolean>(`${this.url}/evaluate`, request);
  }


  getEvaluationData(id: string): Observable<IComponentCollaborator> {
    return this._apiService
        .get<IComponentCollaborator>(`${this.url}/${id}/evaluation-data`);
  }
}

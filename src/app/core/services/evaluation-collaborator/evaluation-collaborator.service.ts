import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IEvaluationCollaboratorPaged } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator-paged.interface';
import { IEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator.interfaces';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationCollaboratorService {
  
  private controller = 'evaluation-collaborator';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
   ) { }

  create(request: IEvaluationCollaborator): Observable<IEvaluationCollaborator> {
    return this._apiService.post<IEvaluationCollaborator>(`${this.url}`, request);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this.url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IEvaluationCollaboratorPaged>> {
     return this._apiService
         .get<IPaginatedResponse<IEvaluationCollaboratorPaged>>(`${this.url}/paging`, paginatedFilter);
  }

}

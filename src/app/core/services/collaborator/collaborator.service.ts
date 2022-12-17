
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ICollaboratorNotInEvaluation } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private controller = 'collaborator';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }


  getAllCollaboratorNotInEvaluation(evaluationId: string): Observable<ICollaboratorNotInEvaluation[]> {
    return this._apiService.get<ICollaboratorNotInEvaluation[]>(`${this.url}/not-in-evaluation/${evaluationId}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<ICollaboratorNotInEvaluation>> {
    return this._apiService
      .get<IPaginatedResponse<ICollaboratorNotInEvaluation>>(`${this.url}/not-in-evaluation/paging`, paginatedFilter);
 }
}


import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '../api.service';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { ICollaborator, ICollaboratorNotInEvaluation } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private _url = `${environment.serverUriApi}/collaborator`;

  constructor(
    private _apiService: ApiService
  ) { }

  getAllCollaboratorNotInEvaluation(evaluationId: string): Observable<ICollaboratorNotInEvaluation[]> {
    return this._apiService.get<ICollaboratorNotInEvaluation[]>(`${this._url}${evaluationId}`);
  }

  getPaginated(paginatedFilter: IPaginatedFilter): Observable<IPaginatedResponse<ICollaborator>> {
    return this._apiService
      .get<IPaginatedResponse<ICollaborator>>(`${this._url}/paging`, paginatedFilter);
  }
}

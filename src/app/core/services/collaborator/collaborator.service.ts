
import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { ICollaboratorNotInEvaluation } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

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

}

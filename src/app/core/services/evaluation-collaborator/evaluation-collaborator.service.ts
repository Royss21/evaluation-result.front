import { Injectable } from '@angular/core';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IEvaluationCollaboratorPaged } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator-paged.interface';
import { IEvaluationCollaboratorReviewPaged } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator-review-paged.interface';
import { IEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator.interfaces';
import { IResultEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/result-evaluation-collaborator.interfaces';
import { ICommentEvaluation } from '@modules/evaluation-collaborator/interfaces/comment-evaluation.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluationCollaboratorService {
  private controller = 'evaluation-collaborator';
  private _url = `${environment.serverUriApi}/${this.controller}`;
  constructor(private _apiService: ApiService) {}

  create(
    request: IEvaluationCollaborator
  ): Observable<IEvaluationCollaborator> {
    return this._apiService.post<IEvaluationCollaborator>(
      `${this._url}`,
      request
    );
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<IEvaluationCollaboratorPaged>> {
    console.log(paginatedFilter);
    return this._apiService.get<
      IPaginatedResponse<IEvaluationCollaboratorPaged>
    >(`${this._url}/paging`, paginatedFilter);
  }

  getReviewEvaluationPaginated(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<IEvaluationCollaboratorReviewPaged>> {
    return this._apiService.get<
      IPaginatedResponse<IEvaluationCollaboratorReviewPaged>
    >(`${this._url}/review-evaluation/paging`, paginatedFilter);
  }

  getResultEvaluation(
    id: string,
    evaluationId: string
  ): Observable<IResultEvaluationCollaborator> {
    return this._apiService.get<IResultEvaluationCollaborator>(
      `${this._url}/${id}/result-evaluation/${evaluationId}`
    );
  }

  saveCommentEvaluation(request: ICommentEvaluation) {
    return this._apiService.put<IEvaluationCollaborator>(
      `${this._url}/save-comment`,
      request
    );
  }
}

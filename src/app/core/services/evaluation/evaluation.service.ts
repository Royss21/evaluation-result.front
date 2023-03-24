
import { Injectable } from '@angular/core';
import { IEvaluationCreate, IEvaluationRes } from '@modules/evaluation/interfaces/evaluation-create.interface';
import { IEvaluationDetail } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { IEvaluationFinished } from '@modules/evaluation/interfaces/evaluation-finished.interface';
import { IEvaluation } from '@modules/evaluation/interfaces/evaluation.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private controller = 'evaluation';
  private _url = `${environment.serverUriApi}/${this.controller}`;

  constructor(
    private _apiService: ApiService
  ) { }


  getDetail(id: string): Observable<IEvaluationDetail> {
    return this._apiService.get<IEvaluationDetail>(`${this._url}/${id}/detail`);
  }

  getEnabledComponents(id: string): Observable<IEvaluation> {
    return this._apiService.get<IEvaluation>(`${this._url}/${id}/enabled-components`);
  }

  getAllDetail(): Observable<IEvaluationDetail[]> {
    return this._apiService.get<IEvaluationDetail[]>(`${this._url}/all-detail`);
  }

  create(request: IEvaluationCreate): Observable<IEvaluationRes> {
    return this._apiService.post<IEvaluationRes>(`${this._url}`, request);
  }

  getAllFinished(): Observable<IEvaluationFinished[]> {
    return this._apiService.get<IEvaluationFinished[]>(`${this._url}/finished`);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }

}


import { Injectable } from '@angular/core';
import { IEvaluationCreate } from '@modules/evaluation/interfaces/evaluation-create.interface';
import { IEvaluationDetail } from '@modules/evaluation/interfaces/evaluation-detail.interface';
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

  getAllDetail(): Observable<IEvaluationDetail[]> {
    return this._apiService.get<IEvaluationDetail[]>(`${this._url}/all-detail`);
  }

  create(request: IEvaluationCreate): Observable<IEvaluationCreate> {
    return this._apiService.post<IEvaluationCreate>(`${this._url}`, request);
  }

}

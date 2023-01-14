
import { Injectable } from '@angular/core';
import { IEvaluationCreate } from '@modules/evaluation/interfaces/evaluation-create.interface';
import { IEvaluationDetail } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { IEvaluation } from '@modules/evaluation/interfaces/evaluation.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private controller = 'evaluation';
  private url = `https://localhost:7253/api/${this.controller}`
  constructor(
    private _apiService: ApiService
  ) { }


  getDetail(id: string): Observable<IEvaluationDetail> {
    return this._apiService.get<IEvaluationDetail>(`${this.url}/${id}/detail`);
  }

  getAllDetail(): Observable<IEvaluationDetail[]> {
    return this._apiService.get<IEvaluationDetail[]>(`${this.url}/all-detail`);
  }

  create(request: IEvaluationCreate): Observable<IEvaluationCreate> {
    return this._apiService.post<IEvaluationCreate>(`${this.url}`, request);
  }

}

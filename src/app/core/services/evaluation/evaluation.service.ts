
import { Injectable } from '@angular/core';
import { IEvaluationDetail } from '@modules/evaluation/interfaces/evaluation-detail.interface';
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

}

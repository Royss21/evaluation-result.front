import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IFinalExamPaginatedFilter, IFinalExamReport } from '@modules/final-exam-report/interfaces/final-exam-report.interface';
import { IProgressExamPaginatedFilter, IProgressExamReport } from '@modules/exam-progress-report/interfaces/exam-progress-report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _url = `${environment.serverUriApi}/report`;
  constructor(private _apiService: ApiService) { }

  getFinalExamPaginated(paginatedFilter: IFinalExamPaginatedFilter): Observable<IPaginatedResponse<IFinalExamReport>> {
    return this._apiService.get<IPaginatedResponse<IFinalExamReport>>(`${this._url}/paging-final-result`, paginatedFilter);
  }

  getAllFinalExam(globalFilter: string, evaluationId: string): Observable<IFinalExamReport[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("globalFilter",globalFilter);
    queryParams = queryParams.append("evaluationId",evaluationId);
    return this._apiService.get<IFinalExamReport[]>(`${this._url}/get-all-final-result`, queryParams);
  }

  getExamProgressPaginated(paginatedFilter: IProgressExamPaginatedFilter): Observable<IPaginatedResponse<IProgressExamReport>> {
    return this._apiService.get<IPaginatedResponse<IProgressExamReport>>(`${this._url}/paging-follow-evaluation`, paginatedFilter);
  }

  getAllProgressExam(globalFilter: string, evaluationId: string): Observable<IProgressExamReport[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("globalFilter",globalFilter);
    queryParams = queryParams.append("evaluationId",evaluationId);
    return this._apiService.get<IProgressExamReport[]>(`${this._url}/get-all-follow-evaluation`, queryParams);
  }

}

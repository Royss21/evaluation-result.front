import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IFinalExamPaginatedFilter, IFinalExamReport } from '@modules/final-exam-report/interfaces/final-exam-report.interface';
import { IExamProgressReport } from '@modules/exam-progress-report/interfaces/exam-progress-report.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _url = `${environment.serverUriApi}/report`;
  constructor(private _apiService: ApiService) { }

  getFinalExamPaginated(paginatedFilter: IFinalExamPaginatedFilter): Observable<IPaginatedResponse<IFinalExamReport>> {
    return this._apiService.get<IPaginatedResponse<IFinalExamReport>>(`${this._url}/paging-final-result`, paginatedFilter);
  }

  getExamProgressPaginated(paginatedFilter: IFinalExamPaginatedFilter): Observable<IPaginatedResponse<IExamProgressReport>> {
    return this._apiService.get<IPaginatedResponse<IExamProgressReport>>(`${this._url}/exam-progress`, paginatedFilter);
  }

}

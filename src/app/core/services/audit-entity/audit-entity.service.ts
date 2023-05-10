import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IAuditEntity } from '@modules/audit-entity/interfaces/audit-entity.interface';
import { ILogsSystem } from '@modules/logs-system/interfaces/logs-system.interface';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private _url = `${environment.serverUriApi}/audit`;

  constructor(private _apiService: ApiService) {}

  getPaginatedEntity(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<IAuditEntity>> {
    return this._apiService.get<IPaginatedResponse<IAuditEntity>>(
      `${this._url}/audit-paging`,
      paginatedFilter
    );
  }

  getPaginatedLog(
    paginatedFilter: any
  ): Observable<IPaginatedResponse<ILogsSystem>> {
    return this._apiService.get<IPaginatedResponse<ILogsSystem>>(
      `${this._url}/log-paging`,
      paginatedFilter
    );
  }
}

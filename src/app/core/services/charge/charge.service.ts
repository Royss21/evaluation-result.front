import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  private _url = `${environment.serverUriApi}/charge`

  constructor(
    private _apiService: ApiService
  ) { }

  getAll(): Observable<ICharge[]> {
    return this._apiService.get<ICharge[]>(this._url);
  }

  getById(id: number): Observable<ICharge> {
    const url = `${this._url}/${id}`;
    return this._apiService.get<ICharge>(url);
  }

  getByAreaId(id: number): Observable<ICharge[]> {
    const url = `${this._url}/by-area/${id}`;
    return this._apiService.get<ICharge[]>(url);
  }

  create(request: ICharge): Observable<ICharge> {
    return this._apiService.post<ICharge>(`${this._url}`, request);
  }

  update(request: ICharge): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${id}`);
  }

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<ICharge>> {
     return this._apiService
         .get<IPaginatedResponse<ICharge>>(`${this._url}/paging`, paginatedFilter);
  }
}

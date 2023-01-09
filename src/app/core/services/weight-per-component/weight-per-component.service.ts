import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IWeightPerComponent } from '@modules/weight-per-component/interfaces/weight-per-component.interface';

@Injectable({
  providedIn: 'root'
})
export class WeightPerComponentService {

  private _url = `${environment.serverUriApi}/hierarchy-component`;

  constructor(private _apiService: ApiService) { }

  create(request: IWeightPerComponent): Observable<IWeightPerComponent> {
    return this._apiService.post<IWeightPerComponent>(`${this._url}`, request);
  }

  update(request: IWeightPerComponent): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(idWeightPerComponent: number): Observable<boolean> {
    return this._apiService
        .delete<boolean>(`${this._url}/${idWeightPerComponent}`);
  }

  getPaginated(paginatedFilter: IPaginatedFilter): Observable<IPaginatedResponse<IWeightPerComponent>> {
    return this._apiService
        .get<IPaginatedResponse<IWeightPerComponent>>(`${this._url}/paging`, paginatedFilter);
  }
}

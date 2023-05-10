import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { IUser } from '@modules/user/interfaces/user.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = `${environment.serverUriApi}/user`;

  constructor(private _apiService: ApiService) {}

  getPaginated(paginatedFilter: any): Observable<IPaginatedResponse<IUser>> {
    return this._apiService.get<IPaginatedResponse<IUser>>(
      `${this._url}/paging`,
      paginatedFilter
    );
  }

  create(request: IUser): Observable<IUser> {
    return this._apiService.post<IUser>(`${this._url}`, request);
  }

  update(request: IUser): Observable<boolean> {
    return this._apiService.put<boolean>(`${this._url}`, request);
  }

  delete(id: string): Observable<boolean> {
    return this._apiService.delete<boolean>(`${this._url}/${id}`);
  }
}

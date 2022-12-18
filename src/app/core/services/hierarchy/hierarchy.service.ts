import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';
import { environment } from 'src/environments/environment';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  private _url = `${environment.serverUriApi}/hierarchy`

  constructor(
    private _apiService: ApiService
  ) { }

  getAll(): Observable<IHierarchy[]> {
    return this._apiService.get<IHierarchy[]>(this._url);
  }

  getById(id: number): Observable<IHierarchy> {
    const url = `${this._url}/${id}`;
    return this._apiService.get<IHierarchy>(url);
  }
}

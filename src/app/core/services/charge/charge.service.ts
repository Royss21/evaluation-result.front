import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { ICharge } from '@modules/charge/interfaces/charge.interface';

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
}

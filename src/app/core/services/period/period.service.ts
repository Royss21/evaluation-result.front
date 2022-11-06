import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { IPeriod } from '@modules/period/interfaces/period.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private controller = 'Period';
  constructor(private _apiService: ApiService) { }

  getPeriodById(id: number) {
    const url = `${this.controller}/id`;
    return this._apiService.get<boolean>(url);
  }

  create(request: IPeriod) {
    delete Object(request).id;
    const url = `${this.controller}`;
    return this._apiService.post<boolean>(`https://localhost:7253/api/${url}`, request);
  }
}

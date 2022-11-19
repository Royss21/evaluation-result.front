import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient
    ) { }

  get<T>(url: string, parameters?: any): Observable<T> {

    return this._httpClient.get<IResponse<T>>(`${url}`, {
          params: parameters
        })
        .pipe(
            filter((p) => p.ok),
            map((p) => p.data)
        );
  }

  getBlob(url: string, parametros?: any): Observable<Blob> {

    return this._httpClient.get<Blob>(`${url}`, {
            params: parametros,
            responseType: 'blob' as 'json'
        })
        .pipe(filter((data: Blob) => !data.type.includes('application/json')));
  }

  post<T>(url: string, body: any, esFormData = false): Observable<T> {

    const formData = new FormData();

    if(esFormData)
      Object.keys(body).forEach(key => formData.append(key, body[key]))

      console.log(url, esFormData ? formData : body)

    return this._httpClient.post<IResponse<T>>(`${url}`,
              esFormData ? formData : body
          )
          .pipe(
              filter((p) => p.ok),
              map((p) => p.data)
          );
  }

  postBlob(url: string, data: any): Observable<Blob> {
    return this._httpClient.post(`${url}`, data, {
        responseType: 'blob'
    });
  }

  postBlobZip(url: string, data: any): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/zip');
    return this._httpClient
        .post(`${url}`, data, {
            headers,
            responseType: 'blob'
        })
        .pipe(filter((p: Blob) => !p.type.includes('application/json')));
  }

  put<T>(url: string, body: any): Observable<T> {
      return this._httpClient.put<IResponse<T>>(`${url}`, body).pipe(
          filter((p) => p.ok),
          map((p) => p.data)
      );
  }

  delete<T>(url: string): Observable<T> {
      return this._httpClient.delete<IResponse<T>>(`${url}`).pipe(
          filter((p) => p.ok),
          map((p) => p.data)
      );
  }

}

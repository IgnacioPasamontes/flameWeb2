import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuantitNoConformalService {

  constructor(private http: HttpClient) { }

  getValidation(model: string, version: string): Observable<any> {
    const url: string = environment.baseUrl_manage + 'model/' + model + '/version/' + version + '/validation';
    return this.http.get(url);
  }
}

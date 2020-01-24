import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagePredictionsService {

  constructor(private http: HttpClient) { }

  deletePrediction(predictionName: string): Observable<any>  {
    const url: string = environment.baseUrl_manage + 'prediction/' + predictionName;
    return this.http.delete(url);
  }
}

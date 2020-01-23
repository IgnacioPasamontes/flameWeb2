import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }


  getPrediction(predictionName: string): Observable<any> {
    const url: string = environment.baseUrl_manage + 'predictions/predictionName/' + predictionName;
    return this.http.get(url);
  }
}

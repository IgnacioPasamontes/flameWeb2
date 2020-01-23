import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Prediction} from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class PredictorService {

  constructor(private http: HttpClient, private prediction: Prediction) { }


  predict(modelName: string, version: string, file: any): Observable<any> {

    const formData = new FormData();
    formData.append('SDF', file);
    const url: string = environment.baseUrl_predict + 'model/' + modelName + '/version/' + version;
    return this.http.put(url, formData);

  }
}

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


  predict(): Observable<any> {

    const formData = new FormData();
    formData.append('SDF', this.prediction.file);
    const url: string = environment.baseUrl_predict + 'model/' + this.prediction.name + '/version/' + this.prediction.version;
    return this.http.put(url, formData);

  }
}

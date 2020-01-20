import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Model} from '../Globals';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  constructor(private http: HttpClient, private model: Model) { }


  buildModel(): Observable<any> {

    const formData = new FormData();
    formData.append('SDF', this.model.file);
    formData.append('parameters', JSON.stringify(this.model.delta));
    const url: string = environment.baseUrl_build + 'model/' + this.model.name;
    return this.http.post(url, formData);

  }
}

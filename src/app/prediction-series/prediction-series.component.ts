import { Component, OnInit } from '@angular/core';
import { Prediction } from '../Globals';

@Component({
  selector: 'app-prediction-series',
  templateUrl: './prediction-series.component.html',
  styleUrls: ['./prediction-series.component.css']
})
export class PredictionSeriesComponent implements OnInit {

  constructor(public prediction: Prediction) { }
  objectKeys = Object.keys;
  fileContent: any;
  num_of_mols = 0;
  type_file: string;


  /**
   * Checks if the first step is completed and initites the upload method observable
   */
  ngOnInit(): void {

  }

  public onChange(fileList: FileList): void {
    const file = fileList[0];
    this.prediction.file = file;
    this.prediction.file_info = {};
    this.prediction.file_info['name'] = file.name;
    this.prediction.file_info['size_M'] = ((file.size/1024)/1024).toFixed(2);
    const extension = file.name.split('.');
    this.prediction.file_info['type_file'] = extension[1];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.prediction.file_info['num_mols'] = (self.fileContent.match(/(\$\$\$\$)/g) || []).length;
      const res_array = self.fileContent.match(/>( )*<(.*)>/g);
      const res_dict = {};
      for (const variable of res_array) {
        const value = variable.replace(/[<> ]*/g, '');
        if (value in res_dict) {
          res_dict[value] = res_dict[value] + 1;
        } else {
          res_dict[value] = 1;
        }
      }
      self.prediction.file_fields = res_dict;
    };
    fileReader.readAsText(file);
  }

}

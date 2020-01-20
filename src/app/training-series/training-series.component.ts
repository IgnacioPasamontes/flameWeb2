import { Component, OnInit } from '@angular/core';
import { Model } from '../Globals';

@Component({
  selector: 'app-training-series',
  templateUrl: './training-series.component.html',
  styleUrls: ['./training-series.component.css']
})
export class TrainingSeriesComponent implements OnInit {

  constructor(public model: Model) { }
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
    this.model.file = file;
    this.model.file_info = {};
    this.model.file_info['name'] = file.name;
    this.model.file_info['size_M'] = ((file.size / 1024) / 1024).toFixed(2);
    const extension = file.name.split('.');
    this.model.file_info['type_file'] = extension[1];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.model.file_info['num_mols'] = (self.fileContent.match(/(\$\$\$\$)/g) || []).length;
      const res_array = self.fileContent.match(/>( )*<(.*)>/g);
      const res_dict = {};
      for (const variable of res_array) {
        const value = variable.replace(/[<> ]*/g, '');
        if (value in res_dict) {
          res_dict[value] = res_dict[value] + 1;
        }
        else {
          res_dict[value] = 1;
        }
      }
      self.model.file_fields = res_dict;
    };
    fileReader.readAsText(file);
  }
}

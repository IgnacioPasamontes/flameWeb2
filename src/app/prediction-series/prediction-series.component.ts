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
  }

}

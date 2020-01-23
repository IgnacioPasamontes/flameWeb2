import { Component, OnInit, OnChanges } from '@angular/core';
import { Prediction, Model } from '../Globals';
import { CommonService } from '../common.service';
import { PredictorService } from './predictor.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit, OnChanges {

  objectKeys = Object.keys;
  models: {};
  modelName = 'Model1';
  version = '0';
  file: any;
  constructor(public service: PredictorService,
              private router: Router,
              private commonService: CommonService,
              public activeModal: NgbActiveModal,
              public prediction: Prediction,
              public model: Model) { }

  ngOnInit() {
    this.models = {};
    this.getModelList();
  }
  public change(fileList: FileList): void {
    const file = fileList[0];
    this.file = file;
  }

  getModelList() {

    this.commonService.getModelList().subscribe(
        result => {
          // result = JSON.parse(result[1]);
          for (const model of result) {
            const modelName = model.text;
            for ( const versionInfo of model.nodes) {
              let version = versionInfo.text;
              // CAST VERSION
              version = version.replace('ver', '');
              version = (version === 'dev') ? '0' : version;
              version = Number(version);
              // INFO OF EACH MODEL
              this.commonService.getModel(modelName, version).subscribe(
                result2 => {
                  if (!(modelName in  this.models)) {
                    this.models[modelName] = [];
                  }
                  this.models[modelName].push(version);
                }
              );
            }
          }
        },
        error => {
          alert(error.message);
        }
    );
  }
  ngOnChanges() {
    $('#options a:first-child').tab('show'); // Select first tab
  }

  predict() {
    this.prediction.predicting = true;
    this.service.predict(this.modelName, this.version, this.file).subscribe(
      result => {
        this.prediction.result = result;
        console.log(this.prediction.result);
        //this.router.navigate(['/modeling/prediction']);
        this.prediction.predicting = false;
      },
      error => {
        alert('Error prediction');
      }
    );
  }
}

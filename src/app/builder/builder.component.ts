import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Model } from '../Globals';
import { BuilderService } from './builder.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit, OnChanges {

  constructor(public model: Model,
    private service: BuilderService,
    private commonService: CommonService,
    private router: Router,
    private toastr: ToastrService ) { }

  @Input() tabChange;
  ngOnInit() {
  }
  ngOnChanges() {
    $('#options a:first-child').tab('show'); // Select first tab
  }

  private isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
  }

  private recursiveDelta(dict_in: {}) {

    let dict_aux = {};
    const dict_out = {};
    for (const key of Object.keys(dict_in)) {
      dict_aux = dict_in[key];
      for (const key2 of Object.keys(dict_aux)) {
        if (key2 === 'value' ) {
          if (this.isDict(dict_aux[key2])) {
            dict_out[key] = this.recursiveDelta(dict_aux[key2]);
          } else {
            if (dict_aux[key2] === '' || dict_aux[key2] === 'null') {
              dict_aux[key2] = null;
            }
            dict_out[key] = dict_aux[key2];
          }
        }
      }
    }
    return dict_out;
  }

  buildModel(name, version): void {

    this.model.delta = {};
    this.model.delta = this.recursiveDelta(this.model.parameters);
    this.model.trainig_models.push(name + '-' + version);
    const inserted = this.toastr.info('Running!', 'Model ' + name + '.v' + version , {
      disableTimeOut: true, positionClass: 'toast-top-right'});

    this.service.buildModel().subscribe(
      result => {
        this.getModelList();
        let iter = 0;
        const intervalId = setInterval(() => {
          if (iter < 15) {
            this.checkModel(name, version, inserted, intervalId);
          }
          else {
            clearInterval(intervalId);
            const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
            if (index > -1) {
              this.model.trainig_models.splice(index, 1);
            }
            this.toastr.clear(inserted.toastId);
            this.toastr.error( 'Model ' + name + '.v' + version + ' \n ' , 'ERROR!', {
            timeOut: 10000, positionClass: 'toast-top-right'});
          }
          iter += 1;
        }, 10000);
      },
      error => {
        const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
        if (index > -1) {
          this.model.trainig_models.splice(index, 1);
        }
        this.model.listModels[name + '-' + version].trained = false;
        this.toastr.clear(inserted.toastId);
        this.toastr.error( 'Model ' + name + '.v' + version + ' \n ' + error.error , 'ERROR!', {
          timeOut: 10000, positionClass: 'toast-top-right'});
        this.getModelList();
      }
    );
    this.router.navigate(['/']);
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
                  // True is trained
                  const dict_info = {};
                  for ( const info of result2) {
                    dict_info[info[0]] = info[2];
                  }
                  const quality = {};
                  for ( const info of (Object.keys(dict_info))) {
                    if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') // HARCODED: NEED TO IMPROVE
                        && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                        && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                          quality[info] =  parseFloat(dict_info[info].toFixed(3));
                    }
                  }
                  this.model.listModels[modelName + '-' + version] = {name: modelName, version: version,
                    trained: true, numMols: dict_info['nobj'], variables: dict_info['nvarx'],
                    type: dict_info['model'], quality: quality};
                },
                error => {
                  this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: false, numMols: '-',
                    variables: '-', type: '-', quality: {}};
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

  // Periodic function to check model
  checkModel(name, version, inserted, intervalId) {
    this.commonService.getModel(name, version).subscribe(
      result => {
          const dict_info = {};
          for (const info of result) {
            dict_info[info[0]] = info[2];
          }
          const quality = {};
          for (const info of (Object.keys(dict_info))) {
            if ( (info !== 'nobj') && (info !== 'nvarx') && (info !== 'model') // HARCODED: NEED TO IMPROVE
                && (info !== 'Conformal_interval_medians' ) && (info !== 'Conformal_prediction_ranges' )
                && (info !== 'Y_adj' ) && (info !== 'Y_pred' )) {
                  quality[info] =  parseFloat(dict_info[info].toFixed(3));
            }
          }
          const index = this.model.trainig_models.indexOf(name + '-' + version, 0);
          if (index > -1) {
            this.model.trainig_models.splice(index, 1);
          }
          this.toastr.clear(inserted.toastId);
          this.model.listModels[name + '-' + version] = {name: name, version: version, trained: true,
          numMols: dict_info['nobj'], variables: dict_info['nvarx'], type: dict_info['model'], quality: quality};
          this.model.trained_models.push(name + ' .v' + version);
          this.toastr.success('Model ' + name + '.v' + version + ' created' , 'MODEL CREATED', {
            timeOut: 5000, positionClass: 'toast-top-right'});
          clearInterval(intervalId);
          this.getModelList();
      },
      error => { // CHECK MAX iterations
       this.model.listModels[name + '-' + version] = {name: name, version: version, trained: false, numMols: '-',
          variables: '-', type: '-', quality: {}};
      }
    );
  }
}

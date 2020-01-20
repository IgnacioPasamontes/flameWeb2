import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, ComponentFactory } from '@angular/core';
import { Manager, Model } from '../Globals';
import { CommonService } from '../common.service';
import { ManagerService } from './manage-models.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-manage-models',
  templateUrl: './manage-models.component.html',
  styleUrls: ['./manage-models.component.css']
})
export class ManageModelsComponent implements OnInit {

  modelName: string;
  objectKeys = Object.keys;

  constructor(public manage: Manager,
              private commonService: CommonService,
              public service: ManagerService,
              public model: Model,
              private toastr: ToastrService) { }


  ngOnInit() {
  }

  /**
   * Creates a new model with the given name and informs the user with a toastr
   */
  createModel(): void {
    const letters = /^[A-Za-z0-9_]+$/;
    if (this.modelName.match(letters)) {
        this.service.createModel(this.modelName).subscribe(
          result => {
            this.modelName = '';
            this.getModelList();
            this.toastr.success('Model ' + result.modelName, 'CREATED', {
              timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
            });
          },
          error => {
              this.toastr.error(error.error.error, 'ERROR', {
                timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
              });
          }
        );
    } else {
        alert('Invalid name');
    }
  }

  deleteModel() {

    this.service.deleteModel(this.model.name).subscribe(
      result => {
        this.toastr.success( 'Model ' + this.model.name + ' deleted', 'DELETED' , {
          timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
        });
        for (const key of this.objectKeys(this.model.listModels)) {
          if (key.indexOf(this.model.name + '-') === 0) {
            delete this.model.listModels[key];
          }
        }
        this.model.name = undefined ;
        this.model.version = undefined;
      },
      error => {
        alert('Delete ERROR');
      }
    );
  }

  deleteVersion() {

    this.service.deleteVersion(this.model.name, this.model.version).subscribe(
      result => {
        this.toastr.success( 'Model ' + this.model.name + '.v' + this.model.version + ' deleted','DELETED', {
          timeOut: 4000, positionClass: 'toast-top-right'
        });
        delete this.model.listModels[this.model.name + '-' + this.model.version];
      },
      error => {
        console.log(error);
        this.toastr.error( 'Model ' + this.model.name + '.v' + this.model.version + ' NOT deleted', 'ERROR',{
          timeOut: 4000, positionClass: 'toast-top-right'
        });
      }
    );

  }

  cloneModel() {

    this.service.cloneModel(this.model.name).subscribe(
      result => {
        this.toastr.success('Model \'' + result['modelName'] + ' v.' + result['version'] + '\'', 'CREATED SUCCESFULLY', {
          timeOut: 5000, positionClass: 'toast-top-right'});
        this.getModelList();
      },
      error => {
       alert('Error cloning');
      }
    );
  }

  exportModel() {
    const url: string = environment.baseUrl_manage + 'model/' + this.manage.name + '/export';
    window.open(url);
  }

  importModel(fileList: FileList) {
    const file = fileList[0];
    this.manage.file = file;
    this.service.importModel().subscribe(
      result => {
        this.toastr.success('Model \'' + result.Model + '\' imported' , 'IMPORTED SUCCESFULLY',{
          timeOut: 5000, positionClass: 'toast-top-right'});
          this.manage.file = undefined;
        this.getModelList();
      },
      error => {
        this.toastr.error('Model \'' + error.error.Model + '\' already exist' , 'ERROR IMPORTING', {
          timeOut: 5000, positionClass: 'toast-top-right'});
      }
    );
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
                  this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: true,
                  numMols: dict_info['nobj'], variables: dict_info['nvarx'], type: dict_info['model'], quality: quality};
                },
                error => { // Not trained
                  this.model.listModels[modelName + '-' + version] = {name: modelName, version: version, trained: false, numMols: '-',
                    variables: '-', type: '-', quality: {}};
                }
              );
            }
          }
        },
        error => {
          console.log(error.message);
          alert(error.message);
        }
    );
  }
}

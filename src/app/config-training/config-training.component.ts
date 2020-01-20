import { Component, OnInit } from '@angular/core';
import { Model} from '../Globals';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-config-training',
  templateUrl: './config-training.component.html',
  styleUrls: ['./config-training.component.css']
})
export class ConfigTrainingComponent implements OnInit {

  constructor(public model: Model) { }

  objectKeys = Object.keys;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  infoSeries = {
    'molecule': ['SDFile_name', 'SDFile_activity', 'SDFile_experimental', 'quantitative', 'normalize_method',
    'convert3D_method', 'ionize_method', 'modelAutoscaling', 'computeMD_method'],
    'model_ensemble': ['SDFile_name', 'SDFile_activity', 'SDFile_experimental', 'quantitative', 'normalize_method',
    'convert3D_method', 'ionize_method', 'modelAutoscaling'],
    'data': ['TSV_objnames', 'TSV_activity', 'TSV_varnames'],
    'ext_data': ['model_set']
  };


  ngOnInit() {

    this.selectedItems = [
    ];

    console.log(this.model.parameters);
    if (this.model.parameters['ensemble_names'].value) {
      for (const index of Object.keys(this.model.parameters['ensemble_names'].value)) {
        const name = this.model.parameters['ensemble_names'].value[index];
        const version = this.model.parameters['ensemble_versions'].value[index];
        this.selectedItems.push(name + ' v.' + version);
      }
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  saveModelsSelected () {

    let info: Array<string>;
    let name: string;
    let version: string;

    this.model.parameters['ensemble_names'].value = [];
    this.model.parameters['ensemble_versions'].value = [];

    for (const model of this.selectedItems) {
      info = model.split(' .v');
      version = info[info.length - 1];
      name = (info.slice(0, info.length - 1)).join();
      this.model.parameters['ensemble_names'].value.push(name);
      this.model.parameters['ensemble_versions'].value.push(Number(version));
    }
  }
}

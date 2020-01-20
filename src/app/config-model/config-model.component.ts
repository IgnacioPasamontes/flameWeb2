import { Component, OnInit, OnChanges, AfterContentChecked } from '@angular/core';
import { Model} from '../Globals';

@Component({
  selector: 'app-config-model',
  templateUrl: './config-model.component.html',
  styleUrls: ['./config-model.component.css']
})
export class ConfigModelComponent implements OnInit, AfterContentChecked {

  constructor(public model: Model) { }

  objectKeys = Object.keys;

  infoModel = ['imbalance'];

  parametersModel = {
    RF: 'RF_parameters',
    PLSDA: 'PLSDA_parameters',
    PLSR: 'PLSR_parameters',
    GNB: 'GNB_parameters',
    SVM: 'SVM_parameters'
  };
  optimizeModel = {
    RF: 'RF_optimize',
    PLSDA: 'PLSDA_optimize',
    PLSR: 'PLSR_optimize',
    GNB: 'GNB_optimize',
    SVM: 'SVM_optimize'
  };

  type_models = {
    data: ['RF', 'PLSDA', 'PLSR', 'GNB', 'SVM'],
    molecule: ['RF', 'PLSDA', 'PLSR', 'GNB', 'SVM'],
    model_ensemble: ['RF', 'PLSDA', 'PLSR', 'GNB', 'SVM', 'mean', 'median', 'majority']

  };
  ngOnInit() {
  }

  ngAfterContentChecked() {
    // CHECK DELTA DEPENDENCIES
    // NOWIS HARDCODED, BUT IT WILL BE AUTOMATED
    if (this.model.parameters['model'].value === 'PLSDA') {
      this.model.parameters['conformal'].value = false;
    }
    if (this.model.parameters['model'].value === 'mean' || this.model.parameters['model'].value === 'median') {
      this.model.parameters['quantitative'].value = true;
      this.model.parameters['conformal'].value = false;
    }
    if (this.model.parameters['model'].value === 'majority') {
      this.model.parameters['quantitative'].value = false;
      this.model.parameters['conformal'].value = false;
    }
  }

}

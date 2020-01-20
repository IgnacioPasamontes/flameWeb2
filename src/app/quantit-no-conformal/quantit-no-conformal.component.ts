import { Component, OnInit } from '@angular/core';
import { QuantitNoConformalService } from './quantit-no-conformal.service';
import {Model} from '../Globals';
import { ChartDataSets, ChartType, ChartOptions} from 'chart.js';
import { Label} from 'ng2-charts';

@Component({
  selector: 'app-quantit-no-conformal',
  templateUrl: './quantit-no-conformal.component.html',
  styleUrls: ['./quantit-no-conformal.component.css']
})
export class QuantitNoConformalComponent implements OnInit {


  constructor(private service: QuantitNoConformalService,
    public model: Model) { }

  objectKeys = Object.keys;
  modelBuildInfo = {};
  modelValidationInfo = {};
  data: Array<any>;

  // Options
  public ChartOptionsPredicted: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
         label: function(tooltipItem, data) {
            return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
         },
         title: function(tooltipItem, data) {
          const label = data.labels[tooltipItem[0].index];
          return label;
         }
      }
    },
   scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'experimental',
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Predicted'
        }
      }],
      ticks: {
        min: -8,
        max: -3,
      }
    },
    legend: {
      display: false
    }
  };
  public ChartOptionsFitted: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
         label: function(tooltipItem, data) {
            return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
         },
         title: function(tooltipItem, data) {
          const label = data.labels[tooltipItem[0].index];
          return label;
         }
      }
    },
   scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'experimental'
        }
      }],
      yAxes: [{
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Fitted'
        }
      }]
    },
    legend: {
      display: false
    }
  };

  public ChartLabels: Label[] = [];

  public ChartDataPredicted: ChartDataSets[] = [
    {
      data: [],
      pointRadius: 3,
      backgroundColor: 'rgba(255,0,0,0.3)',
      type: 'scatter',
      showLine: false,
      fill: false,
    },
    {
      data: [],
      type: 'line', 
      fill: false,
      pointRadius: 1
    },
  ];

  public ChartDataFitted: ChartDataSets[] = [
    {
      data: [],
      pointRadius: 3,
      backgroundColor: 'rgba(255,0,0,0.3)',
      type: '',
      showLine: false,
      fill: false
    },
    {
      data: [],
      type: 'line',
      fill: false,
      pointRadius: 1
    },
  ];

  public ChartType: ChartType = 'line';

  ngOnInit() {
    this.getValidation();
  }

  getValidation() {
    this.service.getValidation(this.model.name, this.model.version).subscribe(
      result => {
          console.log(result);
          const info = result;
          for (const modelInfo of info['model_build_info']) {
            if (typeof modelInfo[2] === 'number') {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            this.modelBuildInfo [modelInfo[0]] = [modelInfo[1], modelInfo[2]];
          }
          for (const modelInfo of info['model_valid_info']) {
            if (typeof modelInfo[2] === 'number') {
              modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
              // do something
            }
            if (typeof modelInfo[2] !== 'object') {
              this.modelValidationInfo [modelInfo[0]] = [modelInfo[1], modelInfo[2]];
            }
          }
          setTimeout(() => {
            // tslint:disable-next-line:forin
            for (const i in info['ymatrix']) {
             if ('Y_pred' in info) {
              this.ChartDataPredicted[0].data[i] = { x: info['ymatrix'][i], y: info['Y_pred'][i]};
              this.ChartDataPredicted[1].data[i] = { x: info['ymatrix'][i], y: info['ymatrix'][i]};
            }
              this.ChartDataFitted[0].data[i] = { x: info['ymatrix'][i], y: info['Y_adj'][i]};
              this.ChartDataFitted[1].data[i] = { x: info['ymatrix'][i], y: info['ymatrix'][i]};
              this.ChartLabels[i] = info['obj_nam'][i];
            }
          }, 50);
      },
      error => {
        alert('Error getting model');
      }
    );
  }

}

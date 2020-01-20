import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Prediction} from '../Globals';
import * as SmilesDrawer from 'smiles-drawer';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartColor} from 'chart.js';

import * as $ from 'jquery';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';



@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']/*,
  encapsulation: ViewEncapsulation.ShadowDom*/
})
export class PredictionComponent implements OnInit, AfterViewInit {

  @ViewChildren('cmp') components: QueryList<ElementRef>;
  dataTable: any;
  info = [];
  head = [];

  modelBuildInfo = {};
  modelValidationInfo = {};
  quantitative = true;
  // PolarArea
  public polarChartOptions: any = {
    responsive: true,
    startAngle : 1 * Math.PI,
    scale: {
      gridLines: {
        color: 'rgba(0, 0, 0, 0.5)'
      },
      ticks: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontStyle : 'bold'
      }
    }
  };
  public polarAreaChartLabels: Label[] = ['TP', 'FP', 'TN', 'FN'];
  public polarAreaChartData: SingleDataSet = [0, 0, 0, 0];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(235,143,3,0.3)', 'rgba(3,49,155,0.3)', 'rgba(255,0,0,0.3)'],
    },
  ];



  constructor(public prediction: Prediction) { }

  ngOnInit() {

    if (this.prediction.result) {
      // INFO ABOUT VALIDATION
      for (const modelInfo of this.prediction.result['external-validation']) {
        if (typeof modelInfo[2] === 'number') {
          modelInfo[2] = parseFloat(modelInfo[2].toFixed(3));
        }
        if (typeof modelInfo[2] !== 'object') {
          this.modelValidationInfo [modelInfo[0]] = [modelInfo[1], modelInfo[2]];
        }
      }
      setTimeout(() => {
        this.polarAreaChartData = [this.modelValidationInfo['TP'][1], this.modelValidationInfo['FP'][1],
        this.modelValidationInfo['TN'][1], this.modelValidationInfo['FN'][1]];
      }, 50);
    }
    console.log(this.modelValidationInfo);
  }

  saveEXCEL() {
    const xls  = Object.assign([], this.info);
    xls.splice(0, 0, this.head);
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(xls);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.prediction.name + 'v.' + this.prediction.version + '_' +this.prediction.file_info['name'] + '.xlsx');
  }
  savePDF() {

    const pdf = new jsPDF();
    pdf.autoTable({
      head: [this.head],
      body: this.info,
      headStyles: {
        2: { halign: 'center'},
        3: { halign: 'center'},
      },
      columnStyles: {
        0: {columnWidth: 40},
        1: {columnWidth: 40},
        2: {columnWidth: 10, halign: 'center'},
        3: {columnWidth: 10, halign: 'center'},
      }
    });
    pdf.save(this.prediction.name + 'v.' + this.prediction.version + '_' +this.prediction.file_info['name'] + '.pdf');
  }

  ngAfterViewInit() {
    if (this.components !== undefined) {
      this.components.forEach((child) => {
        const options = {'width': 300, 'height': 150};
        const smilesDrawer = new SmilesDrawer.Drawer(options);
        SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
          smilesDrawer.draw(tree, child.nativeElement.id, 'light', false);
          }, function (err) {
            console.log(err);
          });
      });
    }
    const table: any = $('#info');
    this.dataTable = table.DataTable();
    // pdf.autoTable({html: '#info'});
    this.info = [];
    this.head = ['Name', 'Mol'];

    if (this.prediction.result.ymatrix) {
      this.head.push('Value');
    }
    if ( this.prediction.result.values) {
      this.head.push('Prediction');
    }
    if ( this.prediction.result.upper_limit) {
      this.head.push('Upper limit');
    }
    if ( this.prediction.result.lower_limit) {
      this.head.push('Lower limit');
    }
    if ( this.prediction.result.c0) {
      this.head.push('Inactive');
    }
    if ( this.prediction.result.c1) {
      this.head.push('Active');
    }
    if ( this.prediction.result.ensemble_c0) {
      this.head.push('Ensemble Class 0');
    }
    if ( this.prediction.result.ensemble_c1) {
      this.head.push('Ensemble Class 1');
    }


    let prediction = [];
    for (let i = 0; i < this.prediction.result.SMILES.length;) {
      prediction = [];
      prediction = [this.prediction.result.obj_nam[i], this.prediction.result.SMILES[i]];

      if (this.prediction.result.ymatrix) {
        prediction.push(this.prediction.result.ymatrix[i].toFixed(3));
      }

      if (this.prediction.result.values) {
        prediction.push(this.prediction.result.values[i].toFixed(3));
      }
      if (this.prediction.result.upper_limit) {
        prediction.push(this.prediction.result.upper_limit[i].toFixed(3));
      }
      if (this.prediction.result.lower_limit) {
        prediction.push(this.prediction.result.lower_limit[i].toFixed(3));
      }
      if (this.prediction.result.c0) {
        prediction.push(this.prediction.result.c0[i]);
      }
      if (this.prediction.result.c1) {
        prediction.push(this.prediction.result.c1[i]);
      }
      if ( this.prediction.result.ensemble_c0) {
        this.head.push(this.prediction.result.ensemble_c0[i].toFixed(3));
      }
      if ( this.prediction.result.ensemble_c1) {
        this.head.push(this.prediction.result.ensemble_c1[i].toFixed(3));
      }
      this.info.push(prediction);
      i = i + 1;
    }
  }
}

import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonService } from '../common.service';
import { Prediction } from '../Globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PredictionComponent } from '../prediction/prediction.component';
import { Router } from '@angular/router';
import 'jquery';
// import 'datatables.net-bs4';
declare var $: any;

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.css']
})
export class PredictionListComponent implements OnInit {

  objectKeys = Object.keys;

  constructor(private commonService: CommonService,
              public prediction: Prediction,
              private modalService: NgbModal) {}

    ngOnInit() {
      this.getPredictionList();
    }

    selectPrediction(name: string) {
      this.prediction.name = name;

    }

    openPredcition(predictionName: string) {
      const modalRef = this.modalService.open(PredictionComponent, {windowClass : 'modalClass'});
      modalRef.componentInstance.predictionName = predictionName;
    }

    getPredictionList() {
      this.commonService.getPredictionList().subscribe(
          result => {
            this.prediction.predictions = result;
            setTimeout(() => {
              const table = $('#dataTable').DataTable();
              $('#dataTable tbody').on( 'click', 'tr', function () {
                $('tr').removeClass('selected'); // removes all highlights from tr's
                $(this).addClass('selected'); // adds the highlight to this row
              });
            }, 100);
          },
          error => {
            alert(error.message);
          }
      );
    }
}

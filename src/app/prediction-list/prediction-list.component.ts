import { Component, OnInit, OnChanges, DoCheck, AfterViewInit} from '@angular/core';
import { CommonService } from '../common.service';
import { Prediction } from '../Globals';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PredictionComponent } from '../prediction/prediction.component';
import 'jquery';
//import 'datatables.net-bs4';
declare var $: any;

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.css']
})
export class PredictionListComponent implements OnInit, DoCheck, AfterViewInit{

 
  constructor(private commonService: CommonService,
              public prediction: Prediction,
              private modalService: NgbModal) {}

    ngOnInit() {
      this.getPredictionList();
    }

    selectPrediction(name: string){
      this.prediction.name = name;

    }

    ngAfterViewInit() {
      setTimeout(() => {
        const table = $('#dataTable').DataTable();
      },200);
    }

    openPredcition(predictionName: string) {
      const modalRef = this.modalService.open(PredictionComponent, {windowClass : 'modalClass'});
      modalRef.componentInstance.predictionName = predictionName;
    }

    getPredictionList() {
      this.commonService.getPredictionList().subscribe(
          result => {
            this.prediction.predictions = result;
            const table = $('#dataTable').DataTable();
          },
          error => {
            alert(error.message);
          }
      );
    }
    ngDoCheck(): void {
      const table = $('#dataTable').DataTable();
      $('#dataTable tbody').on( 'click', 'tr', function () {
        $('tr').removeClass('selected'); // removes all highlights from tr's
        $(this).addClass('selected'); // adds the highlight to this row
      });
    }
}

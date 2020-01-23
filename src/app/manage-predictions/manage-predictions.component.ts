import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'datatables.net-bs4';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Model, Globals, Prediction, Manager } from '../Globals';
import { PredictorComponent} from '../predictor/predictor.component';
declare var $: any;

@Component({
  selector: 'app-manage-predictions',
  templateUrl: './manage-predictions.component.html',
  styleUrls: ['./manage-predictions.component.css']
})
export class ManagePredictionsComponent implements OnInit {

  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }

  newPrediction(){
    const modalRef = this.modalService.open(PredictorComponent,{size: 'lg'});
  }

  delete() {
    const table = $('#dataTable').DataTable();
    table.row('.selected').remove().draw( false );

    // CALL API TO DELTE PREDICTION
  }
}

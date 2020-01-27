import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'datatables.net-bs4';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { Prediction } from '../Globals';
import { ToastrService } from 'ngx-toastr';
import { ManagePredictionsService } from './manage-predictions.service';
import { PredictorComponent} from '../predictor/predictor.component';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-manage-predictions',
  templateUrl: './manage-predictions.component.html',
  styleUrls: ['./manage-predictions.component.css']
})
export class ManagePredictionsComponent implements OnInit {

  constructor( private commonService: CommonService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private service: ManagePredictionsService,
              private prediction: Prediction,
              private router: Router) { }

  ngOnInit() {
  }

  newPrediction() {
    const modalRef = this.modalService.open(PredictorComponent, { size: 'lg'});
  }

  deletePrediction() {
    const table = $('#dataTable').DataTable();
    table.row('.selected').remove().draw(false);

    this.service.deletePrediction(this.prediction.name).subscribe(
      result => {
        this.toastr.success( 'Prediction "' + this.prediction.name + '" deleted', 'DELETED' , {
          timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
        });
      },
      error => {
          this.toastr.error(error.error.error, 'ERROR', {
            timeOut: 4000, positionClass: 'toast-top-right', progressBar: true
          });
      }
    );
  }
}

import { Component, OnInit, AfterViewInit, OnChanges, DoCheck} from '@angular/core';
import { CommonService } from '../common.service';
import 'jquery';
//import 'datatables.net-bs4';
declare var $: any;

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.css']
})
export class PredictionListComponent implements OnInit, DoCheck {

  predictions: Array<any> = undefined;
  constructor(private commonService: CommonService,) {}

    ngOnInit() {
      this.getPredictionList();
    }


    getPredictionList() {

      this.commonService.getPredictionList().subscribe(
          result => {
            $('#dataTable').DataTable();
            this.predictions = result;
            alert('getPredictionList');
          },
          error => {
            alert(error.message);
          }
      );
    }
    ngDoCheck(): void {
      alert('DoCheck');
      const table = $('#dataTable').DataTable();
      $('#dataTable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
          $(this).removeClass('selected');
        } else {
          table.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
      } );
    }
}

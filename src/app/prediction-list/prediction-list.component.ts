import { Component, OnInit, AfterViewInit, OnChanges, DoCheck} from '@angular/core';
import 'jquery';
import 'datatables.net-bs4';
declare var $: any;

@Component({
  selector: 'app-prediction-list',
  templateUrl: './prediction-list.component.html',
  styleUrls: ['./prediction-list.component.css']
})
export class PredictionListComponent implements OnInit, DoCheck {

  constructor() {}

    ngOnInit() {
    }

    ngDoCheck(): void {

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

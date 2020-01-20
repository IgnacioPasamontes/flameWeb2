import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'datatables.net-bs4';
declare var $: any;

@Component({
  selector: 'app-manage-predictions',
  templateUrl: './manage-predictions.component.html',
  styleUrls: ['./manage-predictions.component.css']
})
export class ManagePredictionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete() {
    const table = $('#dataTable').DataTable();
    table.row('.selected').remove().draw( false );

    // CALL API TO DELTE PREDICTION
  }
}

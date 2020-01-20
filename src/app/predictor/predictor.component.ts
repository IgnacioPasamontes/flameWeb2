import { Component, OnInit, OnChanges } from '@angular/core';
import { Prediction, Model } from '../Globals';
import { PredictorService } from './predictor.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-predictor',
  templateUrl: './predictor.component.html',
  styleUrls: ['./predictor.component.css']
})
export class PredictorComponent implements OnInit, OnChanges {

  constructor(public prediction: Prediction,
              public service: PredictorService,
              private router: Router,
              public model: Model) { }

  ngOnInit() {
  }
  ngOnChanges() {
    $('#options a:first-child').tab('show'); // Select first tab
  }

  predict() {
    this.prediction.predicting = true;
    this.service.predict().subscribe(
      result => {
        this.prediction.result = result;
        console.log(this.prediction.result);
        this.router.navigate(['/modeling/prediction']);
        this.prediction.predicting = false;
        setTimeout(function () {
          $('#options a:last-child').tab('show'); // Select first tab
        }, 300);
      },
      error => {
        alert('Error prediction');
      }
    );
  }
}

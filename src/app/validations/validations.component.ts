import { Component, OnInit, Input } from '@angular/core';
import {Model} from '../Globals';
import { CommonService } from '../common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.css']
})
export class ValidationsComponent implements OnInit {
  @Input() name;
  @Input() version;

  constructor(public model: Model, 
              private commonService: CommonService,
              public activeModal: NgbActiveModal) { }


  ngOnInit() {
    this.getParameters();
  }

  getParameters(): void {
    this.commonService.getParameters(this.name, this.version).subscribe(
      result => {
        this.model.parameters = result;
      },
      error => {
        alert(error.status + ' : ' + error.statusText);
      },
      () => { // when subscribe finishes
        // console.log('actual parameters.yaml \n', parameters);
      }
    );
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Model} from '../Globals';

@Component({
  selector: 'app-config-preferences',
  templateUrl: './config-preferences.component.html',
  styleUrls: ['./config-preferences.component.css']
})
export class ConfigPreferencesComponent implements OnInit {

  constructor(private model: Model) { }

  objectKeys = Object.keys;


  infoPreferences = ['SDFile_experimental',  'modelingToolkit', 'mol_batch', 'numCPUs',
                    'output_format', 'output_md', 'verbose_error'];

  ngOnInit() {
  }

}

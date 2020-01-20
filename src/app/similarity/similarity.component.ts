import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import { Similarity } from '../Globals';
import { SimilarityService} from './similarity.service';
import * as SmilesDrawer from 'smiles-drawer';

@Component({
  selector: 'app-similarity',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css']
})
export class SimilarityComponent implements OnInit, AfterViewInit {

  num_cutoff = '10';
  dist_cutoff = '0.7';

  constructor(public similarity: Similarity,
    private service: SimilarityService) { }

  @ViewChildren('cmp') components: QueryList<ElementRef>;
  objectKeys = Object.keys;
  fileContent: any;
  spaces: {};
  space: string = 'Space1';
  version: string = 'dev';
  result = [];
  smileSrc = [];
  nameSrc = [];

  ngOnInit() {

    this.spaces = {};
    this.service.getSpaces().subscribe(
      result => {
        for (const space of result) {
          this.spaces[space.text] = [];
          for (const nodes of space.nodes) {
            this.spaces[space.text].push(nodes.text);

          }
        }
        console.log(this.spaces);
      },
      error => {
        console.log(error.message);
        alert(error.message);
      }
    );
  }
  search() {
     // CAST VERSION
    this.version = this.version.replace('ver', '');
    this.version = (this.version === 'dev') ? '0' : this.version;
    this.result = [];
    this.nameSrc = [];
    this.smileSrc = [];
    this.service.search(this.space, this.version, this.num_cutoff, this.dist_cutoff).subscribe(
      result => {
        this.result = result.search_results;
        this.nameSrc = result.obj_nam;
        this.smileSrc = result.SMILES;
      },
      error => {
        console.log(error.message);
        alert(error.status);
        alert(error.message);
      }
    );
  }

 
  public change(fileList: FileList): void {
    const file = fileList[0];
    this.similarity.file = file;
    this.similarity.file_info = {};
    this.similarity.file_info['name'] = file.name;
    this.similarity.file_info['size_M'] = ((file.size / 1024) / 1024).toFixed(2);
    const extension = file.name.split('.');
    this.similarity.file_info['type_file'] = extension[1];
    const fileReader: FileReader = new FileReader();
    const self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
      self.similarity.file_info['num_mols'] = (self.fileContent.match(/(\$\$\$\$)/g) || []).length;
      const res_array = self.fileContent.match(/>( )*<(.*)>/g);
      const res_dict = {};
      for (const variable of res_array) {
        const value = variable.replace(/[<> ]*/g, '');
        if (value in res_dict) {
          res_dict[value] = res_dict[value] + 1;
        }
        else {
          res_dict[value] = 1;
        }
      }
      self.similarity.file_fields = res_dict;
    };
    fileReader.readAsText(file);
  }

  ngAfterViewInit() {
    this.components.changes.subscribe(
      () => {
        if (this.components !== undefined) {
          this.components.forEach((child) => {
            const options = {'width': 300, 'height': 150};
            const smilesDrawer = new SmilesDrawer.Drawer(options);
            SmilesDrawer.parse(child.nativeElement.textContent, function (tree) {
              smilesDrawer.draw(tree, child.nativeElement.id, 'light', false);
              }, function (err) {
                console.log(err);
              });
          });
        }
    });
  }
}

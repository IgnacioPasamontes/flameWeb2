import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modeling-sidebar',
  templateUrl: './modeling-sidebar.component.html',
  styleUrls: ['./modeling-sidebar.component.css']
})
export class ModelingSidebarComponent implements OnInit {

  constructor(  private router: Router) { }

  ngOnInit() {
  }

  isActive(url: string) {
    return this.router.url.includes(url);

 }
}

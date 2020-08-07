import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  choosenRoute: string = '';

  displaySelectedRoute(route: string) {
    this.choosenRoute = route;
   }


  constructor() { }

  ngOnInit(): void {
  }

}

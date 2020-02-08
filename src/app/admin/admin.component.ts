import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `

  <div class="toll-header"> Toll Collection Project Server : Admin </div>
    <div class="container">
  <p style="margin:5px;" fxLayout="row" fxLayoutAlign="end start" >
      <app-log-out></app-log-out>
    </p>
    <router-outlet></router-outlet>
</div>
  `,
    styles: [`
    :host {
      margin:0;
    }
    .toll-header{
      text-align:center;
      padding:1.2em;
      background-color: black;
      color: white;
      font-weight:700;
      font-size:3em;
    }
    .container {
      padding: 2em ;
      max-width:100%;
      background-color:#fafafa;
    }
  `]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

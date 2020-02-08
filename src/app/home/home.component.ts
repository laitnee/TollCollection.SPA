import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/Auth/auth.service';
import { Role } from '../Core/models/role.enum';
import { Router } from '@angular/router';
import { IAuthStatus } from '../Core/Auth/IAuthService';


@Component({
  selector: 'app-home',
  template: `
    <div class="home-container" fxLayout="column" fxLayoutAlign="center center">
      <div *ngIf="displayLogin">

        <div *ngIf="!_togglePage">
          <app-login></app-login>
        </div>
        <div *ngIf="_togglePage">
          <app-register></app-register>
        </div>
        <div >
            <div fxLayoutAlign="center" style="margin-top: 32px;">
            <button mat-flat-button color="warn" (click)="togglePage()">{{ _togglePage ? 'Login instead' : 'Register instead'}}</button>
          </div>
        </div>
      </div>
      <!-- <div style="height:70%" *ngIf="!displayLogin">
      {{reRoute()}}
        <div style="height:100%" fxLayout="row" fxLayoutAlign="center center" class="mat-display-3">
            <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
        </div>
      </div> -->

  `,
  styles: [
    `
    :host {
      display: flex;
      flex-direction: column;
      height:100%;
      justify-content: center;
      background: url('./assets/bgoct.jpg') ;
      background-repeat: no-repeat;
      background-size: cover;
    }
    div[fxLayout] { margin-top: 32 px;}
    `
  ]
})
export class HomeComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _displayLogin = true;
  // tslint:disable-next-line: variable-name
  _togglePage = false;
  loading = false;
  authStatus: IAuthStatus;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.authStatus = this.authService.authStatus.value;
    this.authService.authStatus.subscribe(
      _authStatus => {
        this.authStatus = _authStatus;
        if (_authStatus.isAuthenticated) {
          this.router.navigate([this.homeRoutePerRole(_authStatus.userRole)]);
        };
      }
    );
  }

  get displayLogin() {
    return !this.authService.authStatus.value.isAuthenticated;
  }

  togglePage() {
    console.log(this._togglePage);
    this._togglePage = !this._togglePage;
  }

  homeRoutePerRole(userRole: Role) {
    switch (userRole) {
      case Role.Admin:
        return '/admin/dashboard';
      default:
        return 'user/dashboard';
    }
  }
}

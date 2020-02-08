import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Auth/auth.service';

@Component({
  selector: 'app-log-out',
  template: `

    <button mat-icon-button color="warn" aria-label="Example icon-button with a heart icon" (click) = "logout()" > logout
    <mat-icon>exit_to_app</mat-icon> </button>

  `,
  styles: []
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

}

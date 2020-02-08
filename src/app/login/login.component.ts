import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../Common/Validations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Core/Auth/auth.service';
import { UiService } from '../Common/ui.service';
import { Role } from '../Core/models/role.enum';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  redirectUrl;

  constructor(
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService, private uiService: UiService,
              private router: Router) {
    route.paramMap.subscribe( params => (this.redirectUrl = params.get('redirectUrl')));
  }

  ngOnInit() {
    this.buildLoginForm();
  }
  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', PasswordValidation]
    });
  }
  login(submittedForm : FormGroup) {
    this.authService.login(submittedForm.value.username, submittedForm.value.password)
    .subscribe(authStatus => {
      console.log(authStatus);
      if (authStatus.isAuthenticated) {
        this.uiService.showToast(`Welcome! ${(authStatus.userRole === 'none') ? 'user' : 'admin'}`);
        this.router.navigate([this.homeRoutePerRole(authStatus.userRole)]);
      }
    }, error => this.loginError = 'Invalid username or password');
  }
  homeRoutePerRole(userRole: Role) {
    switch (userRole){
      case Role.Admin:
        return 'admin';
      default:
        return 'user';
    }
  }
}

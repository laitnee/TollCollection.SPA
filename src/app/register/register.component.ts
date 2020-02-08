import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Core/Auth/auth.service';
import { UiService } from '../Common/ui.service';
import { Role } from '../Core/models/role.enum';
import { User } from '../Core/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerError = '';
  redirectUrl;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private uiService: UiService
  ) {
    route.paramMap.subscribe(params => this.redirectUrl = params.get('redirectUrl'))
  }

  ngOnInit() {
    this.buildRegisterForm();
  }
  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      NIN: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      Role: [`${Role.None}`],
      AccountBalance: ['0'],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register(submittedForm: FormGroup) {
    if (this.registerForm.valid) {
      const user: User = Object.assign({}, this.registerForm.value);
      this.authService.register(user).subscribe(
        _ => {
          this.router.navigate(['home']);
          this.uiService.showToast('Registration Successful!');
        },
        error => {
          this.registerError = error;
          this.uiService.showToast('an error has occured');
        });
    }
  }
}

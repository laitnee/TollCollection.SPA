import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from 'src/app/Core/models/User';
import { AuthService } from 'src/app/Core/Auth/auth.service';
import { error } from 'util';
import { UiService } from 'src/app/Common/ui.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  rechargeForm: FormGroup;
  rechargeError: '';
  user: User;

  constructor(private formbuilder: FormBuilder,
    private userService: UserService,
  private uiService: UiService, private authService: AuthService) { }

  ngOnInit() {
    this.rechargeForm = this.formbuilder.group({
      amount: ['', Validators.required]
    });
  }

  async recharge(){
    if(this.rechargeForm.valid){
      let userId;
      this.authService.authStatus.subscribe(_ => userId = _.userId);
      this.userService.rechargeAccount(userId ,+this.rechargeForm.value.amount).subscribe(
        next => {
          this.userService.getUser(userId);
          this.uiService.showToast('transaction successful')
        },
        err => this.uiService.showToast(err)
      );
    }
  }
}

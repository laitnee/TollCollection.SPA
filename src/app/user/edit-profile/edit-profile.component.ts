import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/Auth/auth.service';
import { UiService } from 'src/app/Common/ui.service';
import { UserService } from '../user.service';
import { User } from 'src/app/Core/models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileUpdateForm: FormGroup;
  formError = '';
  userUpdate: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    private userService: UserService
  ){}
  ngOnInit() {

    this.userService.currentUser.subscribe(_ => this.userUpdate = _ ,
      err => this.formError = err);
    console.log(this.userUpdate);
    this.buildForm();
  }

  buildForm() {
    this.profileUpdateForm = this.formBuilder.group({
      firstName: [`${this.userUpdate.firstName }`, Validators.required],
      lastName: [`${this.userUpdate.lastName }`, Validators.required],
      NIN: [`${this.userUpdate.nin }` , Validators.required],
      phoneNumber: [`${this.userUpdate.phoneNumber }`, Validators.required],
    });
  }

  updateProfile() {
    if( this.profileUpdateForm.valid) {
      this.userUpdate.firstName = this.profileUpdateForm.value.firstName;
      this.userUpdate.lastName = this.profileUpdateForm.value.lastName;
      this.userUpdate.nin = this.profileUpdateForm.value.NIN;
      this.userUpdate.phoneNumber = this.profileUpdateForm.value.phoneNumber;
      console.log(this.userUpdate);
      this.userService.updateUser(this.userUpdate).subscribe(
        res => {
          this.uiService.showToast('profile update successfull');
          this.userService.getUser(+this.userUpdate.id).subscribe(
          result => this.userUpdate = result,
          err => this.uiService.showToast('error occured retrieving user')
        );
      },
        err => {
          return this.uiService.showToast('an error occured while trying to update user');
        }
      )
    }
  }
}

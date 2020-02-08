import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UiService } from 'src/app/Common/ui.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/Core/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardAction = '';
  currentUser: User;
  userToAdminId: number;

  constructor(
    private adminService: AdminService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.adminService.getCurrentUser().subscribe(
      _ => this.currentUser = _,
      err => this.uiService.showToast('error retrieving data')
    );
    this.adminService.currentUser.subscribe(
      res => this.currentUser = res
    );
  }
  makeAdmin() {
    this.adminService.makeAdmin(this.userToAdminId).subscribe(
      res => this.uiService.showToast(`user ${this.userToAdminId} now an admin`),
      err => this.uiService.showToast(`error making user ${this.userToAdminId} an admin`)
    )
  }

}

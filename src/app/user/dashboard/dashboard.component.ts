import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Core/models/User';
import { AuthService } from 'src/app/Core/Auth/auth.service';
import { UiService } from 'src/app/Common/ui.service';
import { UserService } from '../user.service';
import { Vehicle } from 'src/app/Core/models/Vehicle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardAction = '';
  currentUser: User;
  displayedColumns: string[] = ['VehicleId', 'PlateNumber', 'TagNumber', 'VehicleName', 'VehicleType'];
  datasource: Vehicle[];

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe(
      _ => this.currentUser = _,
      err => this.uiService.showToast('error retrieving data')
    );
    this.userService.currentUser.subscribe(
      res => this.currentUser = res
    );

    this.userService.getVehicles(+this.authService.authStatus.value.userId).subscribe(
      res => this.datasource = res,
      err => this.uiService.showToast('unable to retrieve vehicles at the moment')
    );
  }
}

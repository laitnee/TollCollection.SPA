import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PlazaComponent } from './plaza/plaza.component';
import { LogComponent } from './log/log.component';
import { AdminComponent } from '../admin/admin.component';
import { AuthService } from '../Core/Auth/auth.service';
import { AdminService } from './admin.service';
import { LogOutComponent } from '../Common/log-out/log-out.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPlazaDialogComponent } from './plaza/add-plaza-dialog/add-plaza-dialog.component';
import { AddVehicleDialogComponent } from './vehicles/add-vehicle-dialog/add-vehicle-dialog.component';
import { AuthGuard } from '../Core/Auth/auth.guard';
import { GeneralModule } from '../Common/general.module';


@NgModule({
  declarations: [DashboardComponent, VehiclesComponent, PlazaComponent,
     LogComponent, AdminComponent, AddPlazaDialogComponent, AddVehicleDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    GeneralModule,
    FlexLayoutModule,
    AdminRoutingModule,
    MaterialModule,
  ],
  providers: [AdminService],
  entryComponents: [
    AddPlazaDialogComponent,
    AddVehicleDialogComponent
  ]
})
export class AdminModule { }

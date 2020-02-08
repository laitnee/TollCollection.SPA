import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RechargeComponent } from './recharge/recharge.component';
import { UserComponent } from '../user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { AuthService } from '../Core/Auth/auth.service';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiService } from '../Common/ui.service';
import { AuthGuard } from '../Core/Auth/auth.guard';
import { GeneralModule } from '../Common/general.module';


@NgModule({
  declarations: [DashboardComponent, TransactionHistoryComponent,  EditProfileComponent, RechargeComponent,  UserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule,    FlexLayoutModule,
    MaterialModule,
    UserRoutingModule,

  ],
  providers: [UserService]
})
export class UserModule { }

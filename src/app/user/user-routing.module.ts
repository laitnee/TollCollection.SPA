import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../Core/Auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RechargeComponent } from './recharge/recharge.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
    //   { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard] },
    //   { path: 'recharge', component: RechargeComponent, canActivate: [AuthGuard]},
    //   { path: 'history', component: TransactionHistoryComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

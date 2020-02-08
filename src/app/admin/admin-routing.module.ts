import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../Core/Auth/auth.guard';
import { Role } from '../Core/models/role.enum';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { expectedRole: Role.Admin},
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {
        expectedRole: Role.Admin,
      }}
    //   { path: 'plaza', component: PlazaComponent, canActivate: [AuthGuard], data: {
    //     expectedRole: Role.Admin,
    //   }},
    //   { path: 'vehicle', component: VehiclesComponent, canActivate: [AuthGuard], data: {
    //     expectedRole: Role.Admin,
    //   }},
    //   { path: 'log', component: LogComponent, canActivate: [AuthGuard], data: {
    //     expectedRole: Role.Admin,
    //   }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './Core/Auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/:redirectUrl', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register/:redirectUrl', component: RegisterComponent},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuard]},
  { path: 'user', loadChildren: './user/user.module#UserModule',  canLoad: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

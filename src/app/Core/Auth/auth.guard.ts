import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route,
   UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthStatus } from './IAuthService';
import { AuthService } from './auth.service';
import { UiService } from 'src/app/Common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus;
  constructor(private authService: AuthService, private router: Router, private uiService: UiService ) {
    this.authService.authStatus.subscribe(
      authStatus => this.currentAuthStatus = authStatus
    );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(next);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(next);
  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
  checkLogin(route?: ActivatedRouteSnapshot ): boolean | Observable<boolean> | Promise<boolean> {
    let roleMatch = true;
    let params: any;
    if (route) {
      const expectedRole = route.data.expectedRole;
      console.log(expectedRole);
      if (expectedRole !== undefined) {
        roleMatch = this.currentAuthStatus.userRole === expectedRole;
      }

      if (roleMatch) {
        params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/')};
      }
    }

    if (!roleMatch) {
      this.uiService.showToast('admin login required!');
      this.router.navigate(['home', params || {}]);
      return false;
    }
    if ( !this.currentAuthStatus.isAuthenticated ){
      // this.uiService.showToast('sign in...');
      this.router.navigate(['home']);
      return false;
    }
    return true;

  }
}

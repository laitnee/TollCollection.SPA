import { Injectable } from '@angular/core';
import { Role } from '../models/role.enum';
import { CacheService } from '../Cache/cache.service';
import { IAuthService, IAuthStatus, IserverAuthResponse } from './IAuthService';
import { BehaviorSubject, Observable } from 'rxjs';
import * as decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/User';
import { transformError } from 'src/app/Common/common';


export const DEFAULT_AUTH_STATUS = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService implements IAuthService {

  baseUrl = environment.apiUrl;

  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || DEFAULT_AUTH_STATUS);

  constructor(private http: HttpClient) {
    super();
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
  }


  login(username: string, password: string): Observable<IAuthStatus> {
    this.logout();
    const loginResponse = this.http.post<IserverAuthResponse>(this.baseUrl + 'api/auth/login',
      {'username': username, 'password': password},  {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')})
      .pipe(
        map(result => {
          this.setToken(result.tokenString);
          const decodedToken = decode(result.tokenString);
          // tslint:disable-next-line: variable-name
          const _authStatus = {
            isAuthenticated : true,
            userId : decodedToken.nameid,
            userRole: (decodedToken.role === 'admin') ? Role.Admin : Role.None
          };
          return _authStatus as IAuthStatus;
        }),
        catchError(transformError)
      );

    loginResponse.subscribe(result => {
        if (result != null) {
          this.authStatus.next(result);
        } else {
          this.authStatus.next(DEFAULT_AUTH_STATUS);
        }
      });

    return loginResponse;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'api/auth/register', user, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).pipe(
        catchError(transformError)
      );
  }

  logout() {
    this.clearToken();
    this.authStatus.next(DEFAULT_AUTH_STATUS);
  }

  private setToken( jwt: string ) {
    this.setItem('jwt', jwt);
  }
  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'));
  }
  getToken(): string {
    return this.getItem('jwt') || '';
  }
  private clearToken() {
    this.removeItem('jwt');
    this.removeItem('user');
  }

}



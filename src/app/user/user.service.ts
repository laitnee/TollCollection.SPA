import { Injectable } from '@angular/core';
import { CacheService } from '../Core/Cache/cache.service';
import { User } from '../Core/models/User';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { IAuthStatus } from '../Core/Auth/IAuthService';
import { AuthService } from '../Core/Auth/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Vehicle } from '../Core/models/Vehicle';
import { ChargeLog } from '../Core/models/ChargeLog';
import { transformError } from '../Common/common';
import { UiService } from '../Common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CacheService{
  baseUrl = environment.apiUrl;

  currentUser = new BehaviorSubject<User>(this.getItem('user') || {} as User);
  private currentAuthStatus: IAuthStatus;

  constructor(private authService: AuthService, private http: HttpClient) {
    super();
    this.authService.authStatus.subscribe(status => this.currentAuthStatus = status);
  }
  getCurrentUser(): Observable<User> {
    const userObservable = this.getUser(+this.currentAuthStatus.userId).pipe(
      catchError(transformError)
    )
    userObservable.subscribe(
      user => this.currentUser.next(user),
      err => throwError(err)
    )
    return userObservable;
  }
  getUser(id: number): Observable<User> {
    const response = this.http.get<User>(`${this.baseUrl}api/user/${id}`).pipe(
      catchError(transformError)
    );
    return response;
  }
  rechargeAccount(userId: number, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}api/user/${+userId}/${+amount}`,{}).pipe(
      catchError(transformError)
    );
  }
  getVehicles(userId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl + 'api/vehicle/' + userId).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl + 'api/user/', user, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  getTransactionHistory(userId: number): Observable<ChargeLog[]> {
    return this.http.get<ChargeLog[]>(this.baseUrl + 'api/chargeLog/user/' + userId).pipe(
      retry(1),
      catchError(transformError)
    );
  }
}

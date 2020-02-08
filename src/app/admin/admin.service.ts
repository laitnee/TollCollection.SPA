import { Injectable } from '@angular/core';
import { CacheService } from '../Core/Cache/cache.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../Core/models/User';
import { IAuthStatus } from '../Core/Auth/IAuthService';
import { AuthService } from '../Core/Auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { transformError } from '../Common/common';
import { ChargeLog } from '../Core/models/ChargeLog';
import { Plaza } from '../Core/models/Plaza';
import { Vehicle } from '../Core/models/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends CacheService {
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

  getPlazas(): Observable<Plaza[]> {
    return this.http.get<Plaza[]>(`${this.baseUrl}api/plaza`).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  delPlaza(plazaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/plaza/${plazaId}`).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  addPlaza(plaza: Plaza): Observable<any>{
    return this.http.post<Plaza>(`${this.baseUrl}api/plaza`, plaza, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).pipe(
        retry(1),
        catchError(transformError)
      );
  }
  addVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.post<Vehicle>(`${this.baseUrl}api/vehicle`, vehicle, {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')}).pipe(
      retry(1),
      catchError(transformError)
    );
}
  getVehiclses(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}api/vehicle`).pipe(
      retry(1),
      catchError(transformError)
    )
  }
  delVehicle(vehicleId: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}api/vehicle/${vehicleId}`).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  makeAdmin(userId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}api/user/makeAdmin/${userId}`, {}).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  getPlazaLog(plazaId: number): Observable<ChargeLog[]> {
    return this.http.get<ChargeLog[]>(`${this.baseUrl}api/chargeLog/plaza/${plazaId}`).pipe(
      retry(1),
      catchError(transformError)
    );
  }
  getLogs(): Observable<ChargeLog[]> {
    return this.http.get<ChargeLog[]>(`${this.baseUrl}api/chargeLog`).pipe(
      retry(1),
      catchError(transformError)
    );
  }
}

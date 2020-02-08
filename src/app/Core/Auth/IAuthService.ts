
import { Role } from '../models/role.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IAuthService {
  authStatus: BehaviorSubject<IAuthStatus>;
  login(username: string, password: string): Observable<IAuthStatus>;
  register(user: User);
  logout();
  getToken(): string;
}

// export interface IAuthProvider {
//   username: string;
//   password: string;
// }

export interface IserverAuthResponse {
  tokenString: string;
  user: User;
}


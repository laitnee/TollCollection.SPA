import { Role } from './role.enum';
import { Vehicle } from './Vehicle';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  nin: string;
  phoneNumber: number;
  role: Role;
  accountBalance: number;
  vehicles: Vehicle;
}

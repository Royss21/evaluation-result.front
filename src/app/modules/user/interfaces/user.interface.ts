import { IRole } from "@auth/interfaces/roles.interface";

export interface IUser {
  id: string;
  isLocked: boolean;
  userName: string;
  names: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  roles: IRole[];
}

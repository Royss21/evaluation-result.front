import { IMenu } from "@modules/main/interfaces/menu.interface";

export interface IToken {
  token: string;
  refreshToken: string;
  expiredIn: string;
  roleName: string;
  name:string;
  menus: IMenu[]
}

export interface ITokenCollaborator {
  token: string;
  refreshToken: string;
  expiredIn: string;
  evaluationId: string;
  name:string;
  typeViewCollaborator: number;
  evaluationCollaboratorId: string;
  isLeaderCompetence: boolean;
  isLeaderAreaObjetive: boolean;
}

export interface IRefreshToken {
  token: string;
  refreshToken: string;
}

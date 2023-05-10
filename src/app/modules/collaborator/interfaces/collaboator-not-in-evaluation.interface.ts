export interface ICollaborator {
  id: string;
  name: string;
  code: string;
  email: string;
  areaId: number;
  areaName: string;
  chargeId: number;
  lastName: string;
  dateEgress: Date;
  gerencyId: number;
  levelName: string;
  chargeName: string;
  middleName: string;
  dateBirthday: Date;
  gerencyName: string;
  dateAdmission: Date;
  hierarchyName: string;
  identityDocumentId: number;
  documentNumber: string;
}

export interface ICollaboratorNotInEvaluation {
  id: string;
  name: string;
  lastName: string;
  areaName: string;
  levelName: string;
  chargeName: string;
  middleName: string;
  gerencyName: string;
  hierarchyName: string;
  documentNumber: string;
}

export interface ICollaboratorCreate {
  code: string;
  name: string;
  email: string;
  dateEgress: Date;
  chargeId: number;
  lastName: string;
  dateBirthday: Date;
  middleName: string;
  dateAdmission: Date;
  documentNumber: string;
}

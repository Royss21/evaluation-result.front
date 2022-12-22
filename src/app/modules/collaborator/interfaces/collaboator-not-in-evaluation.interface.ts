export interface ICollaborator {
  chargeId: number,
  documentNumber: string,
  middleName: string,
  lastName: string,
  name: string,
  email: string,
  code: string,
  dateBirthday: Date,
  dateAdmission: Date,
  dateEgress: Date,
  id: string;
  areaId: number,
  gerencyId: number,
  chargeName: string,
  hierarchyName: string,
  gerencyName: string,
  areaName: string,
  levelName: string
}

export interface ICollaboratorNotInEvaluation{
  id:string;
  chargeName: string;
  hierarchyName : string;
  gerencyName : string;
  areaName : string;
  levelName : string;
  documentNumber : string;
  middleName : string;
  name : string;
  lastName : string;
}

export interface ICollaboratorCreate {
  chargeId: number,
  documentNumber: string,
  middleName: string,
  lastName: string,
  name: string,
  email: string,
  code: string,
  dateBirthday: Date,
  dateAdmission: Date,
  dateEgress: Date
}

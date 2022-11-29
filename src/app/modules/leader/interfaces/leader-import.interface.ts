import { TypeImportLeader } from "@shared/constants/enums-general";

export interface ILeaderImport{
  
  file: any; 
  evaluationId: string;
  isToReprocess: boolean;
  typeImportLeaders: TypeImportLeader 

}
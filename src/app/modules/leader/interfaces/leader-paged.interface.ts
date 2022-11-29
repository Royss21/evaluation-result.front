import { TypeImportLeader } from "@shared/constants/enums-general";
import { IEvaluationLeader } from "./leader.interface";

export interface ILeaderPaged extends IEvaluationLeader{
  
  documentNumber: string;
  leaderName: string;
  countAssignedCollaborator: number;
}
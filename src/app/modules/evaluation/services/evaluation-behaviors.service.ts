import { Injectable } from '@angular/core';
import { ICollaboratorLeaderEvaluate } from '@modules/evaluation-leader/interfaces/leader.interface copy';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationBehaviorsService {

  private _goToEvaluateStageBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  goToEvaluateStage$: Observable<any>;

  private _flagLeaderBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  flagLeader$: Observable<any>;

  private _evaluationCurrentBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  evaluationCurrent$: Observable<any>;

  constructor() {
    this.goToEvaluateStage$ = this._goToEvaluateStageBehavior.asObservable();
    this.flagLeader$ = this._flagLeaderBehavior.asObservable();
    this.evaluationCurrent$ = this._evaluationCurrentBehavior.asObservable();
  }

  gotoEvaluateStage(stageId: number){
    this._goToEvaluateStageBehavior.next(stageId);
  }

  resetValue(){
    this._goToEvaluateStageBehavior.next(null);
  }

  setFlagLeader( flagLeader: ICollaboratorLeaderEvaluate){
    this._flagLeaderBehavior.next(flagLeader);
  }

  removeCardEvaluationCurrent(){
    this._evaluationCurrentBehavior.next(null);
  }

}

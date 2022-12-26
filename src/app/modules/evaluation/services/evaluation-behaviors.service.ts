import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationBehaviorsService {

  private _goToEvaluateStageBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  goToEvaluateStage$: Observable<any>;

  constructor() {
    this.goToEvaluateStage$ = this._goToEvaluateStageBehavior.asObservable();
  }

  gotoEvaluateStage(stageId: number){
    this._goToEvaluateStageBehavior.next(stageId);
  }

  resetValue(){
    this._goToEvaluateStageBehavior.next(null);
  }

}

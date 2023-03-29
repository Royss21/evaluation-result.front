import { Subject, takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConstantsGeneral } from '@shared/constants';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { IPeriodEvaluation } from '@modules/period/interfaces/period-in-progress.interface';
import { EvaluationBehaviorsService } from '@modules/evaluation/services/evaluation-behaviors.service';
import { IComponentsRangeDate, IStageRangeDate } from '@modules/evaluation/interfaces/evaluation-detail.interface';
import { ICollaboratorLeaderEvaluate } from '@modules/evaluation-leader/interfaces/leader.interface copy';
import { LeaderService } from '@core/services/evaluation-leader/leader.service';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.scss']
})
export class EvaluationDetailComponent {

  private unsubscribe$ = new Subject<any>();
  private _evaluationId: string;

  evaluationInProgress: IPeriodEvaluation | null = null;
  stagesRangeDate: IStageRangeDate[] = [];
  components: IComponentsRangeDate[] = [];

  isLeaderAreaObjetive : boolean = false;
  isLeaderCompetence : boolean = false;
  logingCollaborator : string  = '';
  leaderFlag: ICollaboratorLeaderEvaluate;

  constructor(
    private _evaluationService: EvaluationService,
    private _leaderService: LeaderService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _evaluationBehavior: EvaluationBehaviorsService
  ) {

  }

  ngOnInit(){
    this.logingCollaborator = localStorage.getItem('logingCollaborator')?.toString() || '';

    if(this.logingCollaborator === '1')
    {
      this.isLeaderAreaObjetive = localStorage.getItem('isLeaderAreaObjetive') == 'true'?  true: false;
      this.isLeaderCompetence = localStorage.getItem('isLeaderCompetence') == 'true'?  true: false;

      console.log(this.isLeaderAreaObjetive, this.isLeaderCompetence, this.logingCollaborator)
      this._leaderService.getComponentAndStageLeader(localStorage.getItem('collaboratorId') || '')
        .subscribe(data => {
          this.leaderFlag = data;
          this._evaluationBehavior.setFlagLeader(data);
        });
    }
    
    this._route.params.subscribe(params => {
      this._evaluationId = params['evaluationId'];
      this._getEvaluationDetail();
      this._goToEvaluateStage();
    });
  }

  ngOnDestroy(): void {
    this._evaluationBehavior.resetValue();
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  get infoObjetivesCorporate(): IComponentsRangeDate | null{
    return this.components.find(c => c.componentId === ConstantsGeneral.components.corporateObjectives) || null;
  }

  get infoObjetivesArea() : IComponentsRangeDate | null{
    return this.components.find(c => c.componentId === ConstantsGeneral.components.areaObjectives) || null;
  }

  get infoCompetence() : IComponentsRangeDate | null{
    return this.components.find(c => c.componentId === ConstantsGeneral.components.competencies) || null;
  }

  private _getEvaluationDetail(){
    this._evaluationService.getDetail(this._evaluationId)
      .subscribe(detail => {
        this.components = detail.components;
        this.stagesRangeDate = detail.stagesEvaluation;
        this.evaluationInProgress = { ...detail } as IPeriodEvaluation;
      })
  }

  private _goToEvaluateStage(){

    this._evaluationBehavior.goToEvaluateStage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(stageId => {

        if([ConstantsGeneral.stages.evaluation, ConstantsGeneral.stages.calibration].includes(stageId))
          this._router.navigateByUrl(`/evaluation/${this._evaluationId}/evaluate-component/${ConstantsGeneral.components.competencies}`);
        else if([ConstantsGeneral.stages.feedback, ConstantsGeneral.stages.approval].includes(stageId))
           this._router.navigateByUrl(`/evaluation/${this._evaluationId}/review-stage/${stageId}`);
      })

  }

  goToEvaluate(componentId: any) {
    if(componentId != '0')
      this._router.navigateByUrl(`/evaluation/${this._evaluationId}/evaluate-component/${componentId}`);
  }

  goToCollaborators() {
    this._router.navigateByUrl(`/evaluation/${this._evaluationId}/collaborator`);
  }

  goToLeaders() {
    this._router.navigateByUrl(`/evaluation/${this._evaluationId}/leader`);
  }

}

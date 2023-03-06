import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { EvaluationCollaboratorService } from '@core/services/evaluation-collaborator/evaluation-collaborator.service';
import { IEvaluationCollaboratorReviewFilter } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator-review-filter.interface';
import { EvaluationHelper } from '@modules/evaluation/helpers/evaluation.helpers';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-review-stage-list',
  templateUrl: './review-stage-list.component.html',
  styleUrls: ['./review-stage-list.component.scss']
})
export class ReviewStageListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();
  private _evaluationId: string = '';
  private _stageId: number;

  title: string;
  evaluateReviewPaginated$: Observable<any>;
  paginated$: Observable<any>;
  evaluateReviewPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IEvaluationCollaboratorReviewFilter;

  constructor(
    private _evaluationCollaborator: EvaluationCollaboratorService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.evaluateReviewPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.evaluateReviewPaginated$ = this.evaluateReviewPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = EvaluationHelper.columnsTableEvaluationReview;
  }
  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this._stageId = params['stageId'];
      this._evaluationId = params['evaluationId'];

      this.title = this._stageId == ConstantsGeneral.stages.feedback
          ? "Revisar evaluación: Etapa de feedback"
          : "Revisar evaluación: Etapa de visto bueno"
    });
  }

  ngAfterContentInit() {
    this._callPaginated();
  }

  private _callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IEvaluationCollaboratorReviewFilter) => {
        if(paginatedFilter){

          this.paginatedFilterCurrent =  {
            ...paginatedFilter,
            evaluationId: this._evaluationId,
            stageId: this._stageId,
            evaluationCollaboratorId : localStorage.getItem('collaboratorId') || ''
          }

          this._evaluationCollaborator.getReviewEvaluationPaginated(this.paginatedFilterCurrent)
              .subscribe(paginated => this.evaluateReviewPaginatedBehavior.next(paginated));
        }
      });
  }

  goToReviewStage(evaluationCollaboratorId:string ){
    //if(this._stageId == ConstantsGeneral.stages.feedback)
      this._router.navigateByUrl(`/evaluation/${this._evaluationId}/collaborator/${evaluationCollaboratorId}/review`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

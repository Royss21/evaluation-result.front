import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';
import { EvaluationCollaboratorService } from '@core/services/evaluation-collaborator/evaluation-collaborator.service';
import { IResultComponentCollaborator, IResultEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/result-evaluation-collaborator.interfaces';
import { ConstantsGeneral } from '@shared/constants';
import { Location } from '@angular/common';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ICommentEvaluation } from '@modules/evaluation-collaborator/interfaces/comment-evaluation.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { IUpdateStatus } from '@modules/evaluate-component/interfaces/update-status.interface';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { IEvaluation } from '@modules/evaluation/interfaces/evaluation.interface';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';

@Component({
  selector: 'app-evaluation-review',
  templateUrl: './evaluation-review.component.html',
  styleUrls: ['./evaluation-review.component.scss']
})
export class EvaluationReviewComponent implements OnInit {

  private _id:string;
  private _evaluationId: string;
  private _statusId: number = 0;
  private _evaluationComponentStageId: number;

  collaboratorInformation: ICollaboratorInformation | null = null;
  comment : string = '';
  resultComponents:  IResultComponentCollaborator[] = [];
  commentFormGroup: FormGroup;
  evaluations: IEvaluation[] = [];
  isStageFeedback: boolean = false;
  labelComment :string = '';
  feedbackComment :string = '';
  title: string ='';

  constructor(
    private _route: ActivatedRoute,
    public _dialog: MatDialog,
    private _location: Location,
    private _fb: FormBuilder,
    private _evaluationCollaboratorService: EvaluationCollaboratorService,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _evaluationService: EvaluationService
  ) {
    this._getRouteParams();
    this._buildCommentForm(null);
  }

  private _getRouteParams(){
    this._route.params
      .subscribe(params =>this._id = params['id']);
    this._route.parent?.params
      .subscribe(params =>this._evaluationId = params['evaluationId']);
  }

  private _setCollaboratorInformation(data : IResultEvaluationCollaborator){
    const{
      collaboratorName,
      chargeName,
      areaName,
      gerencyName,
      documentNumber,
      hierarchyName,
      levelName,
      statusId,
      statusName
    } = data;

    this.collaboratorInformation = {
      collaboratorName,
      chargeName,
      areaName,
      gerencyName,
      documentNumber,
      hierarchyName,
      levelName,
      statusId,
      statusName
    }
  }

  private _buildCommentForm(commentEvaluation: ICommentEvaluation | null){
    this.commentFormGroup =  this._fb.group({
      componentCollaboratorCommentId: [ commentEvaluation?.componentCollaboratorCommentId || 0 ],
      comment: [ commentEvaluation?.comment || '', [ Validators.required, CustomValidations.NotEmpty]],
    });
  }

  private _save(commentEvaluation: ICommentEvaluation){
    this._evaluationCollaboratorService.saveCommentEvaluation(commentEvaluation)
      .subscribe(data => this._showConfirmMessage());
  }

  private _showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this._location.back()
    });
  }

  get isStatusCompleted(){
    return this._statusId == ConstantsGeneral.status.Completed;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.commentFormGroup.controls;
  }

  ngOnInit(): void {
    this._evaluationCollaboratorService.getResultEvaluation(this._id, this._evaluationId)
      .subscribe(data => {
        console.log(data)

        this._setCollaboratorInformation(data);
        this._id = data.id;
        this.resultComponents = data.resultComponents;
        this._statusId = data.statusId;
        this._evaluationComponentStageId = data.evaluationComponentStageId;
        this.isStageFeedback = data.stageId == ConstantsGeneral.stages.feedback;
        this.labelComment = this.isStageFeedback ? 'Feedback' : 'Visto bueno';
        this.feedbackComment = data.feedbackComment;
        this.title = this.isStageFeedback ? 'Evaluación: Feedback' : 'Evaluación';
        const commentEvaluation: ICommentEvaluation = {
          componentCollaboratorCommentId: data.componentCollaboratorCommentId,
          comment : this.isStageFeedback ? data.feedbackComment : data.approvalComment
        }
        this._buildCommentForm(commentEvaluation);
      })
  }

  confirmSave(){

    CustomValidations.marcarFormGroupTouched(this.commentFormGroup);

    if(this.commentFormGroup.invalid)
      return;

    const commentEvaluation: ICommentEvaluation = { ...this.commentFormGroup.getRawValue() } ;

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._save(commentEvaluation);
    });
  }

  cancel(){
    if(this._statusId == ConstantsGeneral.status.InProgress)
    {
      const updateStatus: IUpdateStatus = {
          evaluationCollaboratorId: this._id,
          evaluationComponentStageId: this._evaluationComponentStageId,
          statusId: ConstantsGeneral.status.Pending,
          isUpdateComponent: false
      }

      this._componentCollaboratorService.updateStatus(updateStatus)
        .subscribe(() => this._location.back())
    }
    else
      this._location.back();
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { CollaboratorService } from '@core/services/collaborator/collaborator.service';
import { EvaluationCollaboratorService } from '@core/services/evaluation-collaborator/evaluation-collaborator.service';
import { ICollaboratorNotInEvaluation } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { EvaluationCollaboratorText } from '@modules/evaluation-collaborator/helpers/evaluation-collaborator.helper';
import { IEvaluationCollaborator } from '@modules/evaluation-collaborator/interfaces/evaluation-collaborator.interfaces';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { map, Observable, startWith } from 'rxjs';
import { RegisterCollaboratorModalBuilderService } from './register-collaborator-modal-builder.service';

@Component({
  selector: 'app-register-collaborator-modal',
  templateUrl: './register-collaborator-modal.component.html',
  styleUrls: ['./register-collaborator-modal.component.scss']
})
export class RegisterCollaboratorModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;
  private _characterOption: string = '';

  evaluationCollaboratorFormGroup: FormGroup;
  modalTitle: string = '';
  collaboratorNameControl = new FormControl('');
  collaborators: ICollaboratorNotInEvaluation[] = [];
  filteredOptions: Observable<ICollaboratorNotInEvaluation[]>;


  constructor(
    private _registerCollaboratorBuilderService: RegisterCollaboratorModalBuilderService,
    private _registerCollaboratorService: EvaluationCollaboratorService,
    private _colaboratorService: CollaboratorService,
    private _modalRef: MatDialogRef<RegisterCollaboratorModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { 

    this.modalTitle = EvaluationCollaboratorText.modalRegisterCollaborator;
    this.evaluationCollaboratorFormGroup = _registerCollaboratorBuilderService.buildEvaluationCollaboratorForm();
  }

  ngOnInit(): void {
    this._getAllCollaboratorNotInEvaluation();
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.evaluationCollaboratorFormGroup.controls;
  }

  private _valueChangeControl(){
    this.filteredOptions = this.collaboratorNameControl.valueChanges.pipe(
      startWith(''),
      map(value => {    

        if(typeof value === 'string' && this._characterOption !== value){
          this._setValueForm(null);
        }

        const valueSearch = typeof value === 'string' ? value : this._displayText(value);
        return this._filterControl(valueSearch || '')
      }),
    );
  }

  private _getAllCollaboratorNotInEvaluation (){
    this._colaboratorService.getAllCollaboratorNotInEvaluation(this.data)
      .subscribe(collaborators =>{
          this.collaborators = [...collaborators];
          this._valueChangeControl();
      })
  }

  private _filterControl(value: any): ICollaboratorNotInEvaluation[] {
    return this.collaborators.filter(c => this._displayText(c).toLowerCase().includes(value.trim().toLowerCase()));
  }

  private _save(evaluationCollaborator: IEvaluationCollaborator): void {
      this._registerCollaboratorService
        .create(evaluationCollaborator).subscribe(() => this._showConfirmMessage())
  }

  private _closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.evaluationCollaboratorFormGroup.reset();
  }

  private _showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this._closeOrReset();
    });
  }

  private _displayText(collaborator: ICollaboratorNotInEvaluation | null): string {
    return `${collaborator?.documentNumber} | ${collaborator?.name} ${collaborator?.lastName} ${collaborator?.middleName}`
  }

  private _setValueForm(collaborator: ICollaboratorNotInEvaluation | null){

    this.controlsForm["areaName"].setValue( collaborator?.areaName || '');
    this.controlsForm["gerencyName"].setValue( collaborator?.gerencyName || '');
    this.controlsForm["hierarchyName"].setValue( collaborator?.hierarchyName || '');
    this.controlsForm["chargeName"].setValue( collaborator?.chargeName || '');
    this.controlsForm["levelName"].setValue( collaborator?.levelName || '');
    this.controlsForm["collaboratorId"].setValue( collaborator?.id || '');
  }

  selectedCollaborator(event: any): void {

    const collaborator = event.option.value as ICollaboratorNotInEvaluation;
    this._characterOption = this._displayText(collaborator);
    this._setValueForm(collaborator);
  }

  displayFn(collaborator: ICollaboratorNotInEvaluation): string {
    
    return collaborator 
      ? `${collaborator?.documentNumber} | ${collaborator?.name} ${collaborator?.lastName} ${collaborator?.middleName}`
      : '';
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.evaluationCollaboratorFormGroup);
    
    if(this.evaluationCollaboratorFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const evaluationCollaborator: IEvaluationCollaborator = { ...this.evaluationCollaboratorFormGroup.getRawValue() } ;
    evaluationCollaborator.evaluationId = this.data;

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) 
        this._save(evaluationCollaborator);
    });
  }

}

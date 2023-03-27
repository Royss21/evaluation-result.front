import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { LeaderService } from '@core/services/evaluation-leader/leader.service';
import { EvaluationService } from '@core/services/evaluation/evaluation.service';
import { LeaderText } from '@modules/evaluation-leader/helpers/leader.helper';
import { ILeaderImport } from '@modules/evaluation-leader/interfaces/leader-import.interface';
import { ConstantsGeneral } from '@shared/constants';
import { TypeImportLeader } from '@shared/constants/enums-general';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { downloadFile } from '@shared/helpers/function';
import { LeaderImportModalBuilderService } from './leader-import-modal-builder.service';

@Component({
  selector: 'app-leader-import-modal',
  templateUrl: './leader-import-modal.component.html',
  styleUrls: ['./leader-import-modal.component.scss']
})
export class LeaderImportModalComponent implements OnInit {

  leaderImportFormGroup: FormGroup;
  modalTitle:string = '';
  hasPreviousImport: boolean = false;
  hasComponentAreaObjectives: boolean = false;
  hasComponentCompentences: boolean = false;

  public acceptFiles = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

  constructor(
    private _leaderImportBuilderService: LeaderImportModalBuilderService,
    private _route: ActivatedRoute,
    private _leaderService: LeaderService,
    private _evaluationService: EvaluationService,
    private _modalRef: MatDialogRef<LeaderImportModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public evaluationId: string
  ) {
    this.modalTitle = LeaderText.modalImport ;
    this.leaderImportFormGroup = _leaderImportBuilderService.buildLeaderImportForm();
  }

  ngOnInit(): void {
    this._existsPreviousImport();
    this._getEnabledComponents();
  }

  private _existsPreviousImport(componentId = ConstantsGeneral.components.competencies){
    this._leaderService.existsPreviousImport(componentId)
      .subscribe(value => this.hasPreviousImport = value);
  }

  private _getEnabledComponents(){
    this._evaluationService.getEnabledComponents(this.evaluationId)
      .subscribe(value => {
          this.hasComponentAreaObjectives = value.hasComponentAreaObjectives;
          this.hasComponentCompentences = value.hasComponentCompetencies;

          this.leaderImportFormGroup.get('typeImportLeaders')?.setValue( this.hasComponentCompentences ? TypeImportLeader.competencies : TypeImportLeader.areaObjectives );
      });
  }

  private _showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.closeModal();
    });
  }

  private _save(leaderImport: ILeaderImport): void {
    this._leaderService.importLeader(leaderImport).subscribe(f => {
      this._showConfirmMessage();
    });
  }

  downloadTemplate(componentId: number){

    const fileName = componentId == ConstantsGeneral.components.areaObjectives
      ? "Plantilla_Lideres_Objetivos_Areas.xlsx"
      : "Plantilla_Lideres_Competencias.xlsx";

    this._leaderService.downloadTemplate(componentId).subscribe(dataBuffer => {
      downloadFile(dataBuffer, fileName)
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

  changeTypeImport(typeImportLeaders: number){
    const componentId = typeImportLeaders == 0
      ? ConstantsGeneral.components.areaObjectives
      : ConstantsGeneral.components.competencies;

    this._existsPreviousImport(componentId);
  }

  confirmSave(){

    CustomValidations.marcarFormGroupTouched(this.leaderImportFormGroup);

    if(this.leaderImportFormGroup.invalid)
      return;

    const dataLeaderImport ={ ...this.leaderImportFormGroup.getRawValue() } ;
    const leaderImport: ILeaderImport = {
      ...dataLeaderImport,
      evaluationId: this.evaluationId,
      file: dataLeaderImport.files[0]
    };

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._save(leaderImport);
    });
  }

  get competenciesId(){
    return ConstantsGeneral.components.competencies;
  }

  get areaObjetivesId(){
    return ConstantsGeneral.components.areaObjectives;
  }

}

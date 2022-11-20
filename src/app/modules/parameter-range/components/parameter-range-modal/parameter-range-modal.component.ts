import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ParameterRangeService } from '@core/services/paramater-range/parameter-range.service';
import { ParameterRangeText } from '@modules/parameter-range/helpers/parameter-range.helper';
import { IParameterRange } from '@modules/parameter-range/interfaces/parameter-range.interface';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ParameterRangeModalBuilderService } from './parameter-range-modal-builder.service';

@Component({
  selector: 'app-parameter-range-modal',
  templateUrl: './parameter-range-modal.component.html',
  styleUrls: ['./parameter-range-modal.component.scss']
})
export class ParameterRangeModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;

  parameterRangeFormGroup: FormGroup;
  modalTitle: string = '';

  constructor(
    private _parameterRangeBuilderService: ParameterRangeModalBuilderService,
    private _parameterRangeService: ParameterRangeService,
    private _modalRef: MatDialogRef<ParameterRangeModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IParameterRange
  ) { 

    this.modalTitle = data ? ParameterRangeText.modalUdpate : ParameterRangeText.modalCreate; 
    this.parameterRangeFormGroup = _parameterRangeBuilderService.buildParameterRangeForm(data);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.parameterRangeFormGroup.controls;
  }

  private save(parameterRange: IParameterRange): void {
    if(!parameterRange.id)
      this._parameterRangeService.create(parameterRange).subscribe(() => this.showConfirmMessage())
    else
      this._parameterRangeService.update(parameterRange).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.parameterRangeFormGroup.reset();
  }

  private showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.closeOrReset();
    });
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.parameterRangeFormGroup);
    
    if(this.parameterRangeFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const parameterRange: IParameterRange = { ...this.parameterRangeFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) 
        this.save(parameterRange);
    });
  }

}

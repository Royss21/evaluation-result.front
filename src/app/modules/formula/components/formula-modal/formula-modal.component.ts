import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { FormulaService } from '@core/services/formula/formula.service';
import { FormulaText } from '@modules/formula/helpers/formula.helper';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { FormulaModalBuilderService } from './formula-modal-builder.service';

@Component({
  selector: 'app-formula-modal',
  templateUrl: './formula-modal.component.html',
  styleUrls: ['./formula-modal.component.scss']
})
export class FormulaModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;

  formulaFormGroup: FormGroup;
  modalTitle: string = '';

  constructor(
    private _formulaBuilderService: FormulaModalBuilderService,
    private _formulaService: FormulaService,
    private _modalRef: MatDialogRef<FormulaModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IFormula
  ) { 

    this.modalTitle = data ? FormulaText.modalUdpate : FormulaText.modalCreate; 
    this.formulaFormGroup = _formulaBuilderService.buildFormulaForm(data);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.formulaFormGroup.controls;
  }

  private save(formula: IFormula): void {
    console.log(formula)
    if(!formula.id)
      this._formulaService.create(formula).subscribe(() => this.showConfirmMessage())
    else
      this._formulaService.update(formula).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.formulaFormGroup.reset();
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

    CustomValidations.marcarFormGroupTouched(this.formulaFormGroup);
    
    if(this.formulaFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const formula: IFormula = { ...this.formulaFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) 
        this.save(formula);
    });
  }

}

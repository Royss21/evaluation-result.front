import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { IPopupConfirm } from '@components/popup-interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { ISubcomponentValue } from '@shared/interfaces/subcomponent-value.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { SubcomponentValueService } from '@core/services/subcomponent-value/subcomponent-value.service';
import { CorporateObjectivesBuilderService } from '@modules/corporate-objectives/services/corporate-objectives-builder.service';

@Component({
  selector: 'app-assign-charge-modal',
  templateUrl: './assign-charge-modal.component.html',
  styleUrls: ['./assign-charge-modal.component.scss']
})
export class AssignChargeModalComponent {

  public modalTitle: string = '';

  public chargeForm = new FormControl(null);
  public assignChargeFormGroup: FormGroup;
  public chargeList: ICharge[] = [];

  private existChargePopPup: IPopupConfirm = {
    icon: 'warning_amber',
    iconColor: 'color-danger',
    text: 'El cargo seleccionado se encuentra asignado.',
    buttonLabelAccept: 'Aceptar'
  };

  constructor(
    private _dialog: MatDialog,
    private _chargeService: ChargeService,
    @Inject(MAT_DIALOG_DATA) public data: ISubcomponent,
    private _modalRef: MatDialogRef<AssignChargeModalComponent>,
    private _subcomponentValueService: SubcomponentValueService,
    private _corporateObjectivesBuilderService: CorporateObjectivesBuilderService
  ) {
    this._getCharges();
    this.assignChargeFormGroup = _corporateObjectivesBuilderService.buildSubComponentValueForm();
    this.modalTitle = `${data.name} - Asignar cargos`
  }

  ngOnInit(): void {
    this._loadSobcomponentsValue();
  }

  subcomponentsPUSH(subcomponentValue: ISubcomponentValue) {
    const fb = this._corporateObjectivesBuilderService.buildItemsSubComponentValueForm(subcomponentValue, this.data.id)
    this.itemsForm.push(fb);
  }

  private _loadSobcomponentsValue(): void {
    this._subcomponentValueService.getAll(this.data.id).subscribe(resp => {
      if (resp.length) {
        resp.forEach((subComponent: ISubcomponentValue) => {
          this.subcomponentsPUSH(subComponent)
        });
      }
    });
  }

  private _validateExistCharge(): boolean {
    return this.itemsForm.controls.find(item => item.get('chargeId')?.value === this.chargeForm.value)?.value;
  }

  public addItemSubcomponent(): void{

    if (!this.chargeForm.value)
      return;

    if (this._validateExistCharge()) {
      this._dialog.open(PopupConfirmComponent, {
        data: this.existChargePopPup,
        autoFocus: false
      });
      return
    }

    const item: ISubcomponentValue = {
      id: this.data.id,
      chargeId: Number(this.chargeForm.value),
      chargeName: String(this.chargeList.find(charge => charge.id === this.chargeForm?.value)?.name),
    } as ISubcomponentValue;

    this.itemsForm.push(this._corporateObjectivesBuilderService.buildItemsSubComponentValueForm(item));

    this.chargeForm.setValue(null);
  }

  public deleteItemSubcomponent(pointIndex: number, item: any) {
    this.itemsForm.removeAt(pointIndex);

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(item.id, dialogRef);
    });

  }

  private delete(id: string, dialogRef: MatDialogRef<PopupChooseComponent, any>): void{
    this._subcomponentValueService
      .delete(id)
      .subscribe(() => {
        dialogRef.close();
      });
  }

  private _getCharges(): void {
    this._chargeService.getAll().subscribe(charges => {
      this.chargeList = charges;
    });
  }

  get itemsForm(): FormArray {
    return this.assignChargeFormGroup.get('itemSubcomponents') as FormArray;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.assignChargeFormGroup.controls;
  }

  private save(subcomponentValue: ISubcomponentValue): void {
    subcomponentValue.relativeWeight = subcomponentValue.relativeWeight / 100;
    subcomponentValue.minimunPercentage = subcomponentValue.minimunPercentage / 100;
    subcomponentValue.maximunPercentage = subcomponentValue.maximunPercentage / 100;

    if(!subcomponentValue.id)
      this._subcomponentValueService.create(subcomponentValue).subscribe(() => this.showConfirmMessage())
    else
      this._subcomponentValueService.update(subcomponentValue).subscribe(() => this.showConfirmMessage())
  }


  private showConfirmMessage(): void {
    this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(pointIndex: number, item: any){

    if (this._isNullOrEmpty(item.get('relativeWeight')?.value) || this._isNullOrEmpty(item.get('minimunPercentage')?.value) ||
        this._isNullOrEmpty(item.get('maximunPercentage')?.value))
      return

    const assignCharge: ISubcomponentValue = item.value as ISubcomponentValue;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(assignCharge);
    });
  }

  private _isNullOrEmpty(value: any): boolean {
    return new String(value).trim() === '' || value === null;
  }
}

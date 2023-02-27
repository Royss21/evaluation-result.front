import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { IPopupConfirm } from '@components/popup-interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { ISubcomponentValue } from '@shared/interfaces/subcomponent-value.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { SubcomponentValueService } from '@core/services/subcomponent-value/subcomponent-value.service';
import { AreaObjectivesBuilderService } from '@modules/area-objectives/services/area-objectives-builder.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-charges-modal',
  templateUrl: './assign-charges-modal.component.html',
  styleUrls: ['./assign-charges-modal.component.scss']
})
export class AssignChargesModalComponent implements OnInit {

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

  private isGreaterPopPup: IPopupConfirm = {
    icon: 'warning_amber',
    iconColor: 'color-danger',
    text: 'La suma de los valores debe ser 100%',
    buttonLabelAccept: 'Aceptar'
  };

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _chargeService: ChargeService,
    private _subcomponentValueService: SubcomponentValueService,
    private _modalRef: MatDialogRef<AssignChargesModalComponent>,
    private _areaObjectivesBuilderService: AreaObjectivesBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: ISubcomponent
  ) {
    this._getCharges();
    this.assignChargeFormGroup = _areaObjectivesBuilderService.buildSubComponentValueForm();
    this.modalTitle = `${data.name} - Asignar cargos`
  }

  ngOnInit(): void {
    this._loadSobcomponentsValue();
  }

  subcomponentsPUSH(subcomponentValue: ISubcomponentValue) {
    const fb = this._areaObjectivesBuilderService.buildItemsSubComponentValueForm(subcomponentValue, this.data.id)
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

  public addItemSubcomponent(): void {

    if (!this.chargeForm.value)
      return;

    if (this._validateExistCharge()) {
      this._dialog.open(PopupConfirmComponent, {
        data: this.existChargePopPup,
        autoFocus: false
      });
      return;
    }

    const item: ISubcomponentValue = {
      chargeId: Number(this.chargeForm.value),
      chargeName: String(this.chargeList.find(charge => charge.id === this.chargeForm?.value)?.name),
    } as ISubcomponentValue;

    this.itemsForm.push(this._areaObjectivesBuilderService.buildItemsSubComponentValueForm(item, this.data.id));

    this.chargeForm.setValue(null);
  }

  public deleteItemSubcomponent(pointIndex: number, item: any) {

    if (!item.value.id) {
      this.itemsForm.removeAt(pointIndex);
      return;
    }

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(String(item.value.id), pointIndex, dialogRef);
    });

  }

  private delete(id: string, pointIndex: number, dialogRef: MatDialogRef<PopupChooseComponent, any>): void{
    this._subcomponentValueService
      .delete(id)
      .subscribe(() => {
        this.itemsForm.removeAt(pointIndex);
        dialogRef.close();
        this.showConfirmMessage("El cargo se retiró correctamente.");
      });
  }

  private _getCharges(): void {
    this._chargeService.getAll().subscribe(charges => {
      this.chargeList = charges.filter(c =>c.areaId === this.data.areaId);
    });
  }

  get itemsForm(): FormArray {
    return this.assignChargeFormGroup.get('itemSubcomponents') as FormArray;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.assignChargeFormGroup.controls;
  }

  private save(subcomponentValue: ISubcomponentValue, pointIndex: number): void {
    subcomponentValue.relativeWeight = subcomponentValue.relativeWeight / 100;
    subcomponentValue.minimunPercentage = subcomponentValue.minimunPercentage / 100;
    subcomponentValue.maximunPercentage = subcomponentValue.maximunPercentage / 100;

    if(!subcomponentValue.id)
      this._subcomponentValueService.create(subcomponentValue).subscribe((subValue: ISubcomponentValue) => {
        this.controlsForm['itemSubcomponents'].get([pointIndex])?.get('id')?.setValue(subValue.id);
        this.controlsForm['itemSubcomponents'].get([pointIndex])?.get('subcomponentId')?.setValue(subValue.subcomponentId);
        this.showConfirmMessage("El cargo se asignó correctamente.");
      });
    else
      this._subcomponentValueService.update(subcomponentValue).subscribe(() => {
        this.showConfirmMessage("El cargo se editó correctamente.");
      });
  }


  private showConfirmMessage(message: string): void {
    this._snackBar.open(message,'ok', {
      duration: 2500,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  private closeModal(): void {
    this._modalRef.close();
  }

  public confirmSave(pointIndex: number, item: any) {

    const pRelative = item.get('relativeWeight')?.value;
    const pMinimum = item.get('minimunPercentage')?.value;
    const pMaximum = item.get('maximunPercentage')?.value;

    if (this._isNullOrEmpty(pRelative) || this._isNullOrEmpty(pMinimum) || this._isNullOrEmpty(pMaximum))
      return;

    // if ((Number(pRelative) + Number(pMinimum) + Number(pMaximum)) !== 100)
    // {
    //   this._dialog.open(PopupConfirmComponent, {
    //     data: this.isGreaterPopPup,
    //     autoFocus: false
    //   });
    //   return;
    // }

    const assignCharge: ISubcomponentValue = item.value as ISubcomponentValue;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(assignCharge, pointIndex);
    });
  }

  private _isNullOrEmpty(value: any): boolean {
    return new String(value).trim() === '' || value === null;
  }
}

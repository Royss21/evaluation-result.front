import { Component, Inject, ViewChildren } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { IArea } from '../../../area/interfaces/area.interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { HierarchyService } from '@core/services/hierarchy/hierarchy.service';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { ChargeHelper } from '@modules/charge/helpers/charge-helper.interface';
import { ChargeBuilderService } from '@modules/charge/services/charge-builder.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-charge-modal',
  templateUrl: './charge-modal.component.html',
  styleUrls: ['./charge-modal.component.scss']
})
export class ChargeModalComponent {

  private isCloseAfterSave: boolean = false;

  public chargeFormGroup: FormGroup;
  public modalTitle: string = ChargeHelper.titleActionText.modalCreate;

  public areaList: IArea[] = [];
  public hierarchyList: IHierarchy[] = [];
  public keywordSearch: string = 'name';

  public defaultValueArea: string = '';
  public defaultValueHierarchy: string = '';
  @ViewChildren('ngAutoCompleteArea') ngAutoCompleteArea : any;
  @ViewChildren('ngAutoCompleteHierarchy') ngAutoCompleteHierarchy : any;

  constructor(
    private _areaService: AreaService,
    private _chargeService: ChargeService,
    private _hierarchyService: HierarchyService,
    private _chargeBuilderService: ChargeBuilderService,
    private _modalRef: MatDialogRef<ChargeModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ICharge
  ) {
    this.chargeFormGroup = _chargeBuilderService.buildChargeForm(data);
    data && this._setDefaultValues();
    this._getHierarchies();
    this._getAreas();
  }

  private _setDefaultValues(): void {
    this.defaultValueArea = this.data.areaName;
    this.defaultValueHierarchy = this.data.hierarchyName;
    this.modalTitle = ChargeHelper.titleActionText.modalUdpate;
  }

  private _getHierarchies(): void {
    this._hierarchyService.getAll().subscribe((res: IHierarchy[]) => {
      this.hierarchyList = res;
    });
  }

  private _getAreas(): void {
    this._areaService.getAll().subscribe((res: IArea[]) => {
      this.areaList = res;
    });
  }

  public selectedArea(area: IArea): void {
    if (typeof area !== 'string')
      this.chargeFormGroup.controls['areaId'].setValue(area.id);
  }

  public selectedHierarchy(hierarchy: IHierarchy): void {
    if (typeof hierarchy !== 'string')
      this.chargeFormGroup.controls['hierarchyId'].setValue(hierarchy.id);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.chargeFormGroup.controls;
  }

  private save(charge: ICharge): void {
    if(!charge.id)
      this._chargeService.create(charge).subscribe(() => this.showConfirmMessage())
    else
      this._chargeService.update(charge).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.chargeFormGroup.reset();
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

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.chargeFormGroup);

    if(this.chargeFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const charge: ICharge = { ...this.chargeFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(charge);
    });
  }

}

import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Inject, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { AreaHelper } from '@modules/area/helpers/area-helper.interface';
import { AreaBuilderService } from '@modules/area/services/area-builder.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { GerencyService } from '@core/services/gerency/gerency.service';

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.scss']
})
export class AreaModalComponent{

  private isCloseAfterSave: boolean = false;

  areaFormGroup: FormGroup;
  modalTitle: string = AreaHelper.titleActionText.modalCreate;

  public gerencyList: IGerency[] = [];
  public keywordSearch: string = 'name';

  public defaultValueGerency: string = '';
  @ViewChildren('ngAutoCompleteGerency') ngAutoCompleteGerency : any;

  constructor(
    private _areaService: AreaService,
    private _gerencyService: GerencyService,
    private _areaBuilderService: AreaBuilderService,
    private _modalRef: MatDialogRef<AreaModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IArea
  ) {
    this.areaFormGroup = _areaBuilderService.buildAreaForm(data);
    data && this._setDefaultValues();
    this._getGerencies();
  }

  private _setDefaultValues(): void {
    this.defaultValueGerency = this.data.gerencyName;
    this.modalTitle = AreaHelper.titleActionText.modalUdpate;
  }

  private _getGerencies(): void {
    this._gerencyService.getAll().subscribe((res: IGerency[]) => {
      this.gerencyList = res;
    });
  }

  public selectedGerency(gerency: IGerency): void {
    if (typeof gerency !== 'string')
      this.areaFormGroup.controls['gerencyId'].setValue(gerency.id);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.areaFormGroup.controls;
  }

  private save(area: IArea): void {
    if(!area.id)
      this._areaService.create(area).subscribe(() => this.showConfirmMessage())
    else
      this._areaService.update(area).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.areaFormGroup.reset();
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

    CustomValidations.marcarFormGroupTouched(this.areaFormGroup);

    if(this.areaFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const area: IArea = { ...this.areaFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(area);
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { AreaObjectivesHelper } from '@modules/area-objectives/helpers/area-objectives-helper.interface';
import { AreaObjectivesBuilderService } from '@modules/area-objectives/services/area-objectives-builder.service';

@Component({
  selector: 'app-area-objectives-modal',
  templateUrl: './area-objectives-modal.component.html',
  styleUrls: ['./area-objectives-modal.component.scss']
})
export class AreaObjectivesModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;

  public modalTitle: string = '';
  public areaList: IArea[] = [];
  public areaObjectivesFormGroup: FormGroup;

  constructor(
    public _dialog: MatDialog,
    private _areaService: AreaService,
    private _subcomponentService: SubcomponentService,
    @Inject(MAT_DIALOG_DATA) public data: ISubcomponent,
    private _modalRef: MatDialogRef<AreaObjectivesModalComponent>,
    private _areaObjectivesBuilderService: AreaObjectivesBuilderService
  ) {
    this.modalTitle = data ? AreaObjectivesHelper.titleActions.modalUdpate : AreaObjectivesHelper.titleActions.modalCreate;
    this.areaObjectivesFormGroup = _areaObjectivesBuilderService.buildAreaObjectivesForm(data);
  }

  ngOnInit(): void {
    this._areaService.getAll().subscribe(areas => {
      this.areaList = areas;
    });
  }

  get areaControl(){
    return this.areaObjectivesFormGroup.get('areaId') as FormControl;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.areaObjectivesFormGroup.controls;
  }

  closeModal(): void {
    this._modalRef.close();
  }

  private closeOrReset(): void{
    if(this.isCloseAfterSave)
      this.closeModal();
    else{
      this.areaObjectivesFormGroup.reset();
      this.areaObjectivesFormGroup = this._areaObjectivesBuilderService.buildAreaObjectivesForm();
    }
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

  private save(subcomponent: ISubcomponent): void {
    if(!subcomponent.id)
      this._subcomponentService.create(subcomponent).subscribe(() => this.showConfirmMessage())
    else
      this._subcomponentService.update(subcomponent).subscribe(() => this.showConfirmMessage())
  }

  confirmSave(isClose: boolean = true){
    CustomValidations.marcarFormGroupTouched(this.areaObjectivesFormGroup);

    if(this.areaObjectivesFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const subComponent: ISubcomponent = { ...this.areaObjectivesFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(subComponent);
    });
  }

}

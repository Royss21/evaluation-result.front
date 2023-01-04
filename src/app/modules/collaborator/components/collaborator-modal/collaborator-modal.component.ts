import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Inject, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { GerencyService } from '@core/services/gerency/gerency.service';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { CollaboratorService } from '@core/services/collaborator/collaborator.service';
import { CollaboratorHelper } from '@modules/collaborator/helpers/collaborator.helpers';
import { CollaboratorBuilderService } from '../../services/collaborator-builder.service';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ICollaborator } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';

@Component({
  selector: 'app-collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent {

  private _isCloseAfterSave: boolean = false;

  public collaboratorFormGroup: FormGroup;
  public modalTitle: string = CollaboratorHelper.titleActionText.modalCreate;

  public areaList: IArea[] = [];
  public chargeList: ICharge[] = [];
  public gerencyList: IGerency[] = [];

  public defaultValueArea: string = '';
  public defaultValueCharge: string = '';
  public defaultValueGerency: string = '';

  public isDisabledArea: boolean = true;
  public isDisabledCharge: boolean = true;

  public keywordSearch: string = 'name';

  @ViewChildren('ngAutoCompleteArea') ngAutoCompleteArea : any;
  @ViewChildren('ngAutoCompleteCharge') ngAutoCompleteCharge : any;
  @ViewChildren('ngAutoCompleteGerency') ngAutoCompleteGerency : any;

  constructor(
    public _dialog: MatDialog,
    private _areaService: AreaService,
    private _chargeService: ChargeService,
    private _gerencyService: GerencyService,
    private _collaboratorService: CollaboratorService,
    @Inject(MAT_DIALOG_DATA) public data: ICollaborator,
    private _modalRef: MatDialogRef<CollaboratorModalComponent>,
    private _collaboratorBuilderService: CollaboratorBuilderService
  ) {
    this.collaboratorFormGroup = _collaboratorBuilderService.buildCollaboratorForm(data);
    data && this._setDefaultValues();
    this._getGerencies();
  }

  private _setDefaultValues(): void {
    this.defaultValueArea = this.data.areaName;
    this.defaultValueCharge = this.data.chargeName;
    this.defaultValueGerency = this.data.gerencyName;

    this.modalTitle = CollaboratorHelper.titleActionText.modalUdpate;
  }

  private _getGerencies(): void {
    this._gerencyService.getAll().subscribe((gerencies: IGerency[]) => {
      this.gerencyList = gerencies;
    });
  }

  private _getAreas(gerencyId: number): void {
    this._areaService.getByIdGerency(gerencyId)
     .subscribe((areas: IArea[]) => {
       this.areaList = areas;
      });
  }

  private _getCharges(areaId: number): void {
    this._chargeService.getByAreaId(areaId)
      .subscribe((charges: ICharge[]) => {
        this.chargeList = charges;
      });
  }

  public selectedGerency(gerency: IGerency): void {
    if (typeof gerency !== 'string') {
      this.defaultValueArea = '';
      this.isDisabledArea = false;
      this._getAreas(gerency.id);
      this.collaboratorFormGroup.controls['areaName'].setValue(null);
      this.collaboratorFormGroup.controls['chargeName'].setValue(null);
    }
  }

  public selectedArea(area: IArea): void {
    if (typeof area !== 'string') {
      this.defaultValueCharge = '';
      this.isDisabledCharge = false;
      this._getCharges(area.id);
      this.collaboratorFormGroup.controls['chargeName'].setValue(null);
    }
  }

  public selectedCharge(charge: ICharge): void {
    if (typeof charge !== 'string')
      this.collaboratorFormGroup.controls['chargeId'].setValue(charge.id);
  }

  private save(collaborator: ICollaborator): void {
    if(!collaborator.id)
      this._collaboratorService.create(collaborator).subscribe(() => this.showConfirmMessage());
    else
      this._collaboratorService.update(collaborator).subscribe(() => this.showConfirmMessage());
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.collaboratorFormGroup.controls;
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

  confirmSave(isClose: boolean = true){
    console.log("IS CLOSE: ", this.collaboratorFormGroup.value)
    CustomValidations.marcarFormGroupTouched(this.collaboratorFormGroup);

    if(this.collaboratorFormGroup.invalid)
      return;

    this._isCloseAfterSave = isClose;

    const collaborator: ICollaborator = { ...this.collaboratorFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(collaborator);
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

  private closeOrReset(): void{

    if(this._isCloseAfterSave)
      this.closeModal();
    else
      this.collaboratorFormGroup.reset();
  }
}

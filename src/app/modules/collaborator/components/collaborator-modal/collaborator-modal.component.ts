import { AbstractControl, FormGroup, Validators } from '@angular/forms';
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
import data from '../../../../../db/document-type/document-type.json'
import { MatSelectChange } from '@angular/material/select';

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

  public documenTypeList: any[] = [{"id": 1,"name": "DNI"},{"id": 2,"name": "Carnet de extranjería"},{"id": 3,"name": "Pasaporte"}];
  public maskDocument: any = '';
  public selectedDocumentType: number;
  public maxLengthDocumentType: number = 8;

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
    this.modalTitle = CollaboratorHelper.titleActionText.modalUdpate;
    this._getAreas(this.data.gerencyId);
    this._getCharges(this.data.areaId);
    this.controlsForm['areaId'].enable();
    this.controlsForm['chargeId'].enable();
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

  public onChangeGerency(select: MatSelectChange) {
    this._getAreas(select.value);
    this.controlsForm['areaId'].enable();
    this.controlsForm['areaId'].setValue(null);
    this.controlsForm['chargeId'].setValue(null);
  }

  public onChangeArea(select: MatSelectChange) {
    this._getCharges(select.value);
    this.controlsForm['chargeId'].enable();
    this.controlsForm['chargeId'].setValue(null);
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

  public maxCharacter() {
    switch (this.selectedDocumentType) {
      case 1: // DNI
        this.maxLengthDocumentType = 8;
        this.controlsForm['documentNumber'].setValidators(Validators.maxLength(8));
        break;
      case 2: // C.E
      this.maxLengthDocumentType = 12;
      this.controlsForm['documentNumber'].setValidators(Validators.maxLength(12));
        break;
      case 3: // PASAPORTE
      this.maxLengthDocumentType = 12;
      this.controlsForm['documentNumber'].setValidators(Validators.maxLength(12));
        break;
      default:
        this.maxLengthDocumentType = 15;
        this.controlsForm['documentNumber'].setValidators(Validators.maxLength(15));
        break;
    }
  }
}

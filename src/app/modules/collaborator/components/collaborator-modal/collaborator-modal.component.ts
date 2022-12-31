import { Component, Inject } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { GerencyService } from '@core/services/gerency/gerency.service';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CollaboratorBuilderService } from '../../services/collaborator-builder.service';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ICollaborator } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { CollaboratorText } from '@modules/collaborator/helpers/collaborator.helpers';

@Component({
  selector: 'app-collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent {

  private _isCloseAfterSave: boolean = false;

  public collaboratorFormGroup: FormGroup;
  public modalTitle: string = '';

  private _areaList: IArea[] = [];
  private _chargeList: ICharge[] = [];
  private _gerencyList: IGerency[] = [];

  public areaListFiltered: Observable<IArea[]>;
  public chargeListFiltered: Observable<ICharge[]>;
  public gerencyListFiltered: Observable<IGerency[]>;

  public areaNameControl = new FormControl('', Validators.required);
  public chargeNameControl = new FormControl('', Validators.required);
  public gerencyNameControl = new FormControl('', Validators.required);

  constructor(
    public _dialog: MatDialog,
    private _areaService: AreaService,
    private _chargeService: ChargeService,
    private _gerencyService: GerencyService,
    @Inject(MAT_DIALOG_DATA) public data: ICollaborator,
    private _modalRef: MatDialogRef<CollaboratorModalComponent>,
    private _collaboratorBuilderService: CollaboratorBuilderService
  ) {
    this.modalTitle = data ? CollaboratorText.modalUdpate : CollaboratorText.modalCreate;
    this.collaboratorFormGroup = _collaboratorBuilderService.buildCollaboratorForm(data);
    this._getGerencies();
  }

  private _setValues(collaborator: ICollaborator) {
    const gerency = this._gerencyList.find(gerency => gerency.id === collaborator.gerencyId) as IGerency;
    this.gerencyNameControl.setValue(gerency.name);
  }

  private _getGerencies(): void {
    this._gerencyService.getAll()
      .subscribe((gerencies: IGerency[]) => {
        this._gerencyList = gerencies;
        this._valueChangeControls();
        this.data && this._setValues(this.data);
      });
  }

  private _getAreas(gerencyId: number): void {
    this._areaService.getByIdGerency(gerencyId)
     .subscribe((areas: IArea[]) => {
       this._areaList = areas;
      });

    this.areaListFiltered = this.areaNameControl.valueChanges
    .pipe(
      startWith(''),
      map((area: any) => {
        return area
          ? this._filterArea(area)
          : this._areaList.slice()
        }
      )
    );
  }

  private _getCharges(areaId: number): void {
    this._chargeService.getByAreaId(areaId)
      .subscribe((charges: ICharge[]) => {
        this._chargeList = charges;
      });

    this.chargeListFiltered = this.chargeNameControl.valueChanges
    .pipe(
      startWith(''),
      map((charge: any) => {
        return charge
          ? this._filterCharge(charge)
          : this._chargeList.slice()
        }
      )
    );
  }

  private _valueChangeControls(): void {
    this.gerencyListFiltered = this.gerencyNameControl.valueChanges
    .pipe(
      startWith(''),
      map((gerency: any) => {
        return gerency
        ? this._filterGerency(gerency)
        : this._gerencyList.slice()
      })
    );
  }

  private _filterGerency(value: string | IGerency): IGerency[] {
    if (typeof value === 'string') {
      return this._gerencyList
        .filter(
          gerency => gerency.name
          .toLowerCase()
          .includes(value.toLowerCase())
        );
    }
    else
      return this._gerencyList;
  }

  private _filterArea(value: string | IArea): IArea[] {
    if (typeof value === 'string') {
      return this._areaList
        .filter(
          area => area.name
          .toLowerCase()
          .includes(value.toLowerCase())
        );
    }
    else
      return this._areaList;
  }

  private _filterCharge(value: string | ICharge): ICharge[] {
    if (typeof value === 'string') {
      return this._chargeList
        .filter(
          charge => charge.name
          .toLowerCase()
          .includes(value.toLowerCase())
        );
    }
    else
      return this._chargeList;
  }

  public selectedGerency(selected: MatAutocompleteSelectedEvent | IGerency): void {
    let gerency = null;
    if ('name' in selected) {
      gerency = selected
    } else {
      gerency = selected.option.value as IGerency;
    }
    this.displayFnGerency(gerency);
    this._getAreas(gerency.id);
  }

  public selectedArea(selected: MatAutocompleteSelectedEvent): void {
    const area = selected.option.value as IArea;
    this._getCharges(area.id);
    this.displayFnArea(area);
  }

  public selectedCharge(selected: MatAutocompleteSelectedEvent): void {
    const charge = selected.option.value as ICharge;
    this.controlsForm['chargeId'].setValue(charge.id);
    this.displayFnCharge(charge);
  }

  public displayFnArea(area: IArea): string {
    return area ? `${area.name}` : '';
  }

  public displayFnGerency(gerency: IGerency): string {
    return gerency ? `${gerency.name}` : '';
  }

  public displayFnCharge(charge: ICharge): string {
    return charge ? `${charge.name}` : '';
  }

  private save(collaborator: ICollaborator): void {
    console.log("collaborator: ", collaborator)
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

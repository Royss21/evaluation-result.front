import { Component, Inject } from '@angular/core';
import { forkJoin, Observable, map, startWith } from 'rxjs';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CollaboratorBuilderService } from '../../services/collaborator-builder.service';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ICollaboratorNotInEvaluationCreate } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GerencyService } from '@core/services/gerency/gerency.service';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ICharge } from '@modules/charge/interfaces/charge.interface';

@Component({
  selector: 'app-collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent {

  private _isCloseAfterSave: boolean = false;


  public collaboratorFormGroup: FormGroup;
  public modalTitle: string = 'Crear colaborador';

  private _areaList: IArea[] = [];
  private _chargeList: ICharge[] = [];
  private _gerencyList: IGerency[] = [];

  public areaListFiltered: Observable<IArea[]>;
  public chargeListFiltered: Observable<ICharge[]>;
  public gerencyListFiltered: Observable<IGerency[]>;

  public areaNameControl = new FormControl('');
  public chargeNameControl = new FormControl('');
  public gerencyNameControl = new FormControl('');

  constructor(
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _modalRef: MatDialogRef<CollaboratorModalComponent>,
    private _areaService: AreaService,
    private _chargeService: ChargeService,
    private _gerencyService: GerencyService,
    private _collaboratorBuilderService: CollaboratorBuilderService
  ) {
    this.collaboratorFormGroup = _collaboratorBuilderService.buildCollaboratorForm();
    this._getGerencies();
  }

  private _getGerencies(): void {
    this._gerencyService.getAll()
      .subscribe((gerencies: IGerency[]) => {
        this._gerencyList = gerencies;
        this._valueChangeControls();
      });
  }

  private _getAreas(): void {
    this._areaService.getAll()
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

  private _getCharges(idArea: number): void {
    this._chargeService.getByAreaId(idArea)
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
          }
        )
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

  public selectedGerency(selected: MatAutocompleteSelectedEvent): void {
    const gerency = selected.option.value as IGerency;
    this._getAreas();
    this.displayFnGerency(gerency);
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

  private save(collaborator: ICollaboratorNotInEvaluationCreate): void {
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

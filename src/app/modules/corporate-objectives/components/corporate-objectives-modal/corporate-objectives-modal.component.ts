import { forkJoin } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { FormulaService } from '@core/services/formula/formula.service';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { CorporateObjectivesBuilderService } from '../../services/corporate-objectives-builder.service';
import { CorporateObjectivesText } from '@modules/corporate-objectives/helpers/corporate-objectives.helper';

@Component({
  selector: 'app-corporate-objectives-modal',
  templateUrl: './corporate-objectives-modal.component.html',
  styleUrls: ['./corporate-objectives-modal.component.scss']
})
export class CorporateObjectivesModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;

  public modalTitle: string = '';
  public areaList: IArea[] = [];
  public formulaList: IFormula[] = [];
  public corporateObjectivesFormGroup: FormGroup;

  constructor(
    public _dialog: MatDialog,
    private _areaService: AreaService,
    private _formulaService: FormulaService,
    private _subcomponentService: SubcomponentService,
    private _modalRef: MatDialogRef<CorporateObjectivesModalComponent>,
    private _corporateObjectivesBuilderService: CorporateObjectivesBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: ISubcomponent
  ) {
    this.modalTitle = data ? CorporateObjectivesText.modalUdpate : CorporateObjectivesText.modalCreate;
    this.corporateObjectivesFormGroup = _corporateObjectivesBuilderService.buildCorporateObjectivesForm(data);
  }

  ngOnInit(): void {
    const areaGetAll = this._areaService.getAll();
    const formulaGetAll = this._formulaService.getAll();

    forkJoin([areaGetAll, formulaGetAll])
      .subscribe(([areas, formulas]) => {
        this.areaList = areas;
        this.formulaList = formulas;
      });
  }

  get areaControl(){
    return this.corporateObjectivesFormGroup.get('areaId') as FormControl;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.corporateObjectivesFormGroup.controls;
  }

  closeModal(): void {
    this._modalRef.close();
  }

  private closeOrReset(): void{
    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.corporateObjectivesFormGroup.reset();
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
    CustomValidations.marcarFormGroupTouched(this.corporateObjectivesFormGroup);

    if(this.corporateObjectivesFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const subComponent: ISubcomponent = { ...this.corporateObjectivesFormGroup.getRawValue() } ;
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

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Component, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { ParameterValueModalBuilderService } from './parameter-value-modal-builder.service';
import { ParameterValueHelper } from '@modules/parameter-range/helpers/parameter-value.helper';
import { ParameterValueService } from '@core/services/paramater-value/parameter-range.service';
import { IParameterValue } from '@modules/parameter-range/interfaces/parameter-value.interface';
import { IParameterValueFilter } from '@modules/parameter-range/helpers/parameter-value-filter.interface';

@Component({
  selector: 'app-parameter-value-modal',
  templateUrl: './parameter-value-modal.component.html',
  styleUrls: ['./parameter-value-modal.component.scss']
})
export class ParameterValueModalComponent {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  private unsubscribe$ = new Subject<any>();

  customPatterns = { 'A': { pattern: new RegExp('\[a-zA-Z\]')} };
  parameterValuePaginated$: Observable<any>;
  paginated$: Observable<any>;
  parameterValuePaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  parameterValueFormGroup: FormGroup;

  constructor(
    private _parameterValueBuilderService: ParameterValueModalBuilderService,
    private _parameterValueService: ParameterValueService,
    private _modalRef: MatDialogRef<ParameterValueModalComponent>,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){
    this.parameterValuePaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.parameterValuePaginated$ = this.parameterValuePaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = ParameterValueHelper.columnsTable;

    this.parameterValueFormGroup = _parameterValueBuilderService.buildParameterValueForm();
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.parameterValueFormGroup.controls;
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IParameterValueFilter) => {
        if(paginatedFilter){

          this.paginatedFilterCurrent = paginatedFilter;
          this._parameterValueService
            .getPaginated({...paginatedFilter, parameterRangeId: this.data})
            .subscribe(paginated => this.parameterValuePaginatedBehavior.next(paginated));
        }
      });
  }

  private showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.clean();
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  private delete(id:number): void{
    this._parameterValueService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  private save(parameterValue: IParameterValue): void {
    if(!parameterValue.id)
      this._parameterValueService.create(parameterValue).subscribe(() => this.showConfirmMessage())
    else
      this._parameterValueService.update(parameterValue).subscribe(() => this.showConfirmMessage())
  }

  clean(){
    this.parameterValueFormGroup.reset();
    this.formGroupDirective.resetForm();
  }

  confirmSave(){

      console.log(this.parameterValueFormGroup)
    CustomValidations.marcarFormGroupTouched(this.parameterValueFormGroup);

    if(this.parameterValueFormGroup.invalid)
      return;

    const parameterValue: IParameterValue = { ...this.parameterValueFormGroup.getRawValue() } ;
    parameterValue.parameterRangeId = this.data;
    parameterValue.name = parameterValue.name.trim();

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(parameterValue);
     });
  }

  edit(parameterValue: IParameterValue){
    this.parameterValueFormGroup = this._parameterValueBuilderService.buildParameterValueForm(parameterValue);
  }

  confirmDeleted(id: number): void {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(id);
    });
  }

  close(){
    this._modalRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

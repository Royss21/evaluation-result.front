import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { PeriodHelper } from '@modules/period/helpers/period.helper';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { PeriodBuilderService } from '@modules/period/service/period-builder.service';
import { PeriodService } from '@core/services/period/period.service';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';


@Component({
  selector: 'app-period-modal',
  templateUrl: './period-modal.component.html',
  styleUrls: ['./period-modal.component.scss']
})
export class PeriodModalComponent {

  private isCloseAfterSave: boolean = false;

  public periodFormGroup: FormGroup;
  public modalTitle: string = PeriodHelper.titleActionText.modalCreate;

  constructor(
    private _periodService: PeriodService,
    private _periodBuilderService: PeriodBuilderService,
    private _modalRef: MatDialogRef<PeriodModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IPeriod
  ) {
    data && (this.modalTitle = PeriodHelper.titleActionText.modalUdpate);
    this.periodFormGroup = _periodBuilderService.buildPeriodForm(data);
  }

  ngOnInit(){
    this._onChangesValuesForm();
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.periodFormGroup.controls;
  }

  private save(period: IPeriod): void {
    if(!period.id)
      this._periodService.create(period).subscribe(() => this.showConfirmMessage())
    else
      this._periodService.update(period).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.periodFormGroup.reset();
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

  private _onChangesValuesForm(): void {

    this.controlsForm['startDate']?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates();
    });

    this.controlsForm['endDate']?.valueChanges.subscribe(value => {
      if(value)
        this._compareDates();
    });
  }

  private _compareDates() {

    const startDateCorp = this.controlsForm['startDate']?.value;
    const endDateCorp = this.controlsForm['endDate']?.value;

    if (this._toDate(startDateCorp)?.getTime() >= this._toDate(endDateCorp)?.getTime())
      this.controlsForm['endDate']?.setErrors({'invalidDate': true});
    else
      this.controlsForm['endDate']?.setErrors(null);
  }

  private _toDate(date: Date | string, numberAdd: number = 0): Date {
    const dateLocal = (typeof date === 'string') ? new Date(date) : date;
    if (numberAdd !== 0) {
      dateLocal.setDate(dateLocal.getDate() + (numberAdd))
      return dateLocal;
    } else
      return dateLocal;
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true) {

    CustomValidations.marcarFormGroupTouched(this.periodFormGroup);

    if(this.periodFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const period: IPeriod = { ...this.periodFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(period);
    });
  }


}

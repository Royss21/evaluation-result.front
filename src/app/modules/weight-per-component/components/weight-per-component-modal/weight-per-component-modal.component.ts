import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { WeightPerComponentHelper } from '@modules/weight-per-component/helpers/weight-per-component.helper';
import { WeightPerComponentService } from '@core/services/weight-per-component/weight-per-component.service';
import { IWeightPerComponent } from '@modules/weight-per-component/interfaces/weight-per-component.interface';
import { WeightPerComponentBuilderService } from '@modules/weight-per-component/service/weight-per-component-builder.service';
@Component({
  selector: 'app-weight-per-component-modal',
  templateUrl: './weight-per-component-modal.component.html',
  styleUrls: ['./weight-per-component-modal.component.scss']
})
export class WeightPerComponentModalComponent {

  private isCloseAfterSave: boolean = false;
  public weightPerComponentFormGroup: FormGroup;
  public modalTitle: string = WeightPerComponentHelper.titleActionText.modalCreate;

  constructor(
    public _dialog: MatDialog,
    private _weightPerComponentService: WeightPerComponentService,
    private _weightPerComponentBuilderService: WeightPerComponentBuilderService,
    private _modalRef: MatDialogRef<WeightPerComponentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IWeightPerComponent
  ) {
    this.weightPerComponentFormGroup = _weightPerComponentBuilderService.buildWeightPerComponentForm(data);
    data && (this.modalTitle = WeightPerComponentHelper.titleActionText.modalUpdate);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.weightPerComponentFormGroup.controls;
  }

  private save(weightPerComponent: IWeightPerComponent): void {
    if(!weightPerComponent.herarchyId)
      this._weightPerComponentService.create(weightPerComponent).subscribe(() => this.showConfirmMessage())
    else
      this._weightPerComponentService.update(weightPerComponent).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.weightPerComponentFormGroup.reset();
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

    CustomValidations.marcarFormGroupTouched(this.weightPerComponentFormGroup);

    if(this.weightPerComponentFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const weightPerComponent: IWeightPerComponent = { ...this.weightPerComponentFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(weightPerComponent);
    });
  }

}

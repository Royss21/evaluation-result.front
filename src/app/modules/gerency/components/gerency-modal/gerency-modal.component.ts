import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { GerencyBuilderService } from '@modules/gerency/services/gerency-builder.service';
import { GerencyService } from '@core/services/gerency/gerency.service';
import { GerencyHelper } from '@modules/gerency/helpers/gerency.helper';
import { ConstantsGeneral } from '@shared/constants';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';

@Component({
  selector: 'app-gerency-modal',
  templateUrl: './gerency-modal.component.html',
  styleUrls: ['./gerency-modal.component.scss']
})
export class GerencyModalComponent {

  private isCloseAfterSave: boolean = false;
  public gerencyFormGroup: FormGroup;
  public modalTitle: string = '';


  constructor(
    public _dialog: MatDialog,
    private _gerencyService: GerencyService,
    private _gerencyBuilderService: GerencyBuilderService,
    private _modalRef: MatDialogRef<GerencyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGerency
  ) {
    this.modalTitle = data ? GerencyHelper.titleActionText.modalUpdate : GerencyHelper.titleActionText.modalCreate;
    this.gerencyFormGroup = _gerencyBuilderService.buildGerencyForm(data);
  }

  private closeOrReset(): void{
    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.gerencyFormGroup.reset();
  }

  private save(gerency: IGerency): void {
    if(!gerency.id)
      this._gerencyService.create(gerency).subscribe(() => this.showConfirmMessage())
    else
      this._gerencyService.update(gerency).subscribe(() => this.showConfirmMessage())
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

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.gerencyFormGroup.controls;
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.gerencyFormGroup);

    if(this.gerencyFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const gerency: IGerency = { ...this.gerencyFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(gerency);
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

}

import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { CompetencesHelper } from '@modules/competences/helpers/competences-helper.interface';
import { CompetencesBuilderService } from '@modules/competences/services/competences-builder.service';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';

@Component({
  selector: 'app-competences-modal',
  templateUrl: './competences-modal.component.html',
  styleUrls: ['./competences-modal.component.scss'],
})
export class CompetencesModalComponent {
  private isCloseAfterSave = false;

  public modalTitle = '';
  public competencesFormGroup: FormGroup;

  constructor(
    public _dialog: MatDialog,
    private _subcomponentService: SubcomponentService,
    @Inject(MAT_DIALOG_DATA) public data: ISubcomponent,
    private _modalRef: MatDialogRef<CompetencesModalComponent>,
    private _competencesBuilderService: CompetencesBuilderService
  ) {
    this.modalTitle = data
      ? CompetencesHelper.titleActions.modalUdpate
      : CompetencesHelper.titleActions.modalCreate;
    this.competencesFormGroup =
      _competencesBuilderService.buildCompetencesForm(data);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.competencesFormGroup.controls;
  }

  closeModal(): void {
    this._modalRef.close();
  }

  private closeOrReset(): void {
    if (this.isCloseAfterSave) this.closeModal();
    else {
      this.competencesFormGroup.reset();
      this.competencesFormGroup =
        this._competencesBuilderService.buildCompetencesForm();
    }
  }

  private showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false,
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.closeOrReset();
    });
  }

  private save(subcomponent: ISubcomponent): void {
    if (!subcomponent.id)
      this._subcomponentService
        .create(subcomponent)
        .subscribe(() => this.showConfirmMessage());
    else
      this._subcomponentService
        .update(subcomponent)
        .subscribe(() => this.showConfirmMessage());
  }

  confirmSave(isClose = true) {
    CustomValidations.marcarFormGroupTouched(this.competencesFormGroup);

    if (this.competencesFormGroup.invalid) return;

    this.isCloseAfterSave = isClose;

    const subComponent: ISubcomponent = {
      ...this.competencesFormGroup.getRawValue(),
    };
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.save(subComponent);
    });
  }
}

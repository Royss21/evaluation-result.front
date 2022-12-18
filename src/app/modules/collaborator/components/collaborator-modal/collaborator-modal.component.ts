import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ICollaboratorNotInEvaluationCreate } from '@modules/collaborator/interfaces/collaboator-not-in-evaluation.interface';
import { ConstantsGeneral } from '@shared/constants';

import { CollaboratorBuilderService } from '../../services/collaborator-builder.service';

@Component({
  selector: 'app-collaborator-modal',
  templateUrl: './collaborator-modal.component.html',
  styleUrls: ['./collaborator-modal.component.scss']
})
export class CollaboratorModalComponent{

  public modalTitle: string = '';
  private _isCloseAfterSave: boolean = false;

  public collaboratorFormGroup: FormGroup;

  constructor(
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private _modalRef: MatDialogRef<CollaboratorModalComponent>,
    private _collaboratorBuilderService: CollaboratorBuilderService
  ) {
    this.collaboratorFormGroup = _collaboratorBuilderService.buildCollaboratorForm();
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
    console.log("IS CLOSE: ", isClose)
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

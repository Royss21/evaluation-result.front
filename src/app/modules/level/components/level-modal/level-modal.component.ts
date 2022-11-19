import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { LevelService } from '@core/services/level/level.service';
import { LevelText } from '@modules/level/helpers/level.helper';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { LevelModalBuilderService } from './level-modal-builder.service';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss']
})
export class LevelModalComponent implements OnInit {

  private isCloseAfterSave: boolean = false;

  levelFormGroup: FormGroup;
  modalTitle: string = '';

  constructor(
    private _levelBuilderService: LevelModalBuilderService,
    private _levelService: LevelService,
    private _modalRef: MatDialogRef<LevelModalComponent>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ILevel
  ) { 

    this.modalTitle = data ? LevelText.modalUdpate : LevelText.modalCreate; 
    this.levelFormGroup = _levelBuilderService.buildLevelForm();
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.levelFormGroup.controls;
  }

  private save(level: ILevel): void {
    console.log(level)
    if(!level.id)
      this._levelService.create(level).subscribe(() => this.showConfirmMessage())
    else
      this._levelService.update(level).subscribe(() => this.showConfirmMessage())
  }

  private closeOrReset(): void{

    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.levelFormGroup.reset();
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

  ngOnInit(): void {
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.levelFormGroup);
    
    if(this.levelFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const level: ILevel = { ...this.levelFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) 
        this.save(level);
    });
  }
}

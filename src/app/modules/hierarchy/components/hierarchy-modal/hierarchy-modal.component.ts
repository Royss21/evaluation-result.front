import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HierarchyService } from '@core/services/hierarchy/hierarchy.service';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { HierarchyBuilderService } from '@modules/hierarchy/services/hierarchy-builder.service';
import { HierarchyHelper } from '@modules/hierarchy/helpers/hierarchy.helper';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { LevelService } from '@core/services/level/level.service';

@Component({
  selector: 'app-hierarchy-modal',
  templateUrl: './hierarchy-modal.component.html',
  styleUrls: ['./hierarchy-modal.component.scss']
})
export class HierarchyModalComponent {

  private isCloseAfterSave: boolean = false;
  public hierarchyFormGroup: FormGroup;
  public modalTitle: string = '';

  private _levelList: ILevel[] = [];
  public levelNameControl = new FormControl('', Validators.required);

  constructor(
    public _dialog: MatDialog,
    private _hierarchyService: HierarchyService,
    private _levelService: LevelService,
    private _hierarchyBuilderService: HierarchyBuilderService,
    private _modalRef: MatDialogRef<HierarchyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHierarchy
  ) {
    this.modalTitle = data ? HierarchyHelper.titleActionText.modalUpdate : HierarchyHelper.titleActionText.modalCreate;
    this.hierarchyFormGroup = _hierarchyBuilderService.buildHierarchyForm(data);
  }

  private _getLevels(): void {
    this._levelService.getAll().subscribe((res: ILevel[]) => {
      this._levelList = res;
    })
  }

  private closeOrReset(): void{
    if(this.isCloseAfterSave)
      this.closeModal();
    else
      this.hierarchyFormGroup.reset();
  }

  private save(hierarchy: IHierarchy): void {
    if(!hierarchy.id)
      this._hierarchyService.create(hierarchy).subscribe(() => this.showConfirmMessage())
    else
      this._hierarchyService.update(hierarchy).subscribe(() => this.showConfirmMessage())
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
    return this.hierarchyFormGroup.controls;
  }

  confirmSave(isClose: boolean = true){

    CustomValidations.marcarFormGroupTouched(this.hierarchyFormGroup);

    if(this.hierarchyFormGroup.invalid)
      return;

    this.isCloseAfterSave = isClose;

    const hierarchy: IHierarchy = { ...this.hierarchyFormGroup.getRawValue() } ;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.save(hierarchy);
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

}

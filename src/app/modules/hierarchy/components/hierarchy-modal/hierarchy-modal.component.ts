import { Component, Inject, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { LevelService } from '@core/services/level/level.service';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { HierarchyHelper } from '@modules/hierarchy/helpers/hierarchy.helper';
import { HierarchyService } from '@core/services/hierarchy/hierarchy.service';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { HierarchyBuilderService } from '@modules/hierarchy/services/hierarchy-builder.service';

@Component({
  selector: 'app-hierarchy-modal',
  templateUrl: './hierarchy-modal.component.html',
  styleUrls: ['./hierarchy-modal.component.scss']
})
export class HierarchyModalComponent{

  public defaulValue: string = '';
  public hierarchyFormGroup: FormGroup;
  private isCloseAfterSave: boolean = false;
  public modalTitle: string = HierarchyHelper.titleActionText.modalCreate;

  public _levelList: ILevel[] = [];
  public keywordSearch: string = 'name';

  @ViewChild('ngAutoCompleteLevel') ngAutoCompleteLevel : any;

  constructor(
    public _dialog: MatDialog,
    private _hierarchyService: HierarchyService,
    private _levelService: LevelService,
    private _hierarchyBuilderService: HierarchyBuilderService,
    private _modalRef: MatDialogRef<HierarchyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHierarchy
  ) {
    this.hierarchyFormGroup = _hierarchyBuilderService.buildHierarchyForm(data);
    if (data) {
      this.defaulValue = data.levelName;
      this.modalTitle = HierarchyHelper.titleActionText.modalUpdate;
    }
    this._getLevels();
  }

  private _getLevels(): void {
    this._levelService.getAll().subscribe((res: ILevel[]) => {
      this._levelList = res;
    })
  }

  public selectedLevel(level: ILevel): void {
    if (typeof level !== 'string')
      this.hierarchyFormGroup.controls['levelId'].setValue(level.id);
  }

  private closeOrReset(): void{
    if(this.isCloseAfterSave)
      this.closeModal();
    else {
      this.defaulValue = '';
      this.hierarchyFormGroup.reset();
      this.ngAutoCompleteLevel.close();
      this.ngAutoCompleteLevel.clear();
    }
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

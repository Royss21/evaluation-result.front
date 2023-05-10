import { Component, Inject } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ConstantsGeneral } from '@shared/constants';
import { CustomValidations } from '@shared/helpers/custom-validations';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { WeightPerComponentHelper } from '@modules/weight-per-component/helpers/weight-per-component.helper';
import { WeightPerComponentService } from '@core/services/weight-per-component/weight-per-component.service';
import { WeightPerComponentBuilderService } from '@modules/weight-per-component/service/weight-per-component-builder.service';
@Component({
  selector: 'app-weight-per-component-modal',
  templateUrl: './weight-per-component-modal.component.html',
  styleUrls: ['./weight-per-component-modal.component.scss'],
})
export class WeightPerComponentModalComponent {
  public weightPerComponentFormGroup: FormGroup;
  public modalTitle: string =
    WeightPerComponentHelper.titleActionText.modalAssign;

  constructor(
    public _dialog: MatDialog,
    private _weightPerComponentService: WeightPerComponentService,
    private _weightPerComponentBuilderService: WeightPerComponentBuilderService,
    private _modalRef: MatDialogRef<WeightPerComponentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IHierarchy
  ) {
    this._createForm();
  }

  private _createForm(): void {
    const components = this.data.hierarchyComponents;
    const weightCorporateObjectives =
      (components.find(
        (comp) =>
          comp.componentId === ConstantsGeneral.components.corporateObjectives
      )?.weight || 0) * 100;
    const weightAreaObjectives =
      (components.find(
        (comp) =>
          comp.componentId === ConstantsGeneral.components.areaObjectives
      )?.weight || 0) * 100;
    const weightCompetencies =
      (components.find(
        (comp) => comp.componentId === ConstantsGeneral.components.competencies
      )?.weight || 0) * 100;

    this.weightPerComponentFormGroup =
      this._weightPerComponentBuilderService.buildWeightPerComponentForm(
        weightCorporateObjectives,
        weightAreaObjectives,
        weightCompetencies
      );
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.weightPerComponentFormGroup.controls;
  }

  get isGreaterThanAHundred(): boolean {
    const totalWeight =
      Number(this.controlsForm['weightCorporateObjectives'].value) +
      Number(this.controlsForm['weightAreaObjectives'].value) +
      Number(this.controlsForm['weightCompetencies'].value);

    return totalWeight > 100 || totalWeight < 100;
  }

  private save(formValues: any): void {
    const components = this.data.hierarchyComponents;
    const listComponents = [];

    for (const item of components) {
      switch (item.componentId) {
        case ConstantsGeneral.components.corporateObjectives:
          listComponents.push({
            hierarchyId: this.data.id,
            componentId: item.componentId,
            weight: formValues.weightCorporateObjectives / 100,
            id: item.id,
          });
          break;
        case ConstantsGeneral.components.areaObjectives:
          listComponents.push({
            hierarchyId: this.data.id,
            componentId: item.componentId,
            weight: formValues.weightAreaObjectives / 100,
            id: item.id,
          });
          break;
        case ConstantsGeneral.components.competencies:
          listComponents.push({
            hierarchyId: this.data.id,
            componentId: item.componentId,
            weight: formValues.weightCompetencies / 100,
            id: item.id,
          });
          break;
        default:
          break;
      }
    }

    console.log(listComponents);
    this._weightPerComponentService
      .update(listComponents)
      .subscribe(() => this.showConfirmMessage());
  }

  private showConfirmMessage(): void {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false,
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.closeModal();
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

  confirmSave() {
    CustomValidations.marcarFormGroupTouched(this.weightPerComponentFormGroup);

    if (this.weightPerComponentFormGroup.invalid || this.isGreaterThanAHundred)
      return;

    const weightPerComponent = this.weightPerComponentFormGroup.value;
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.save(weightPerComponent);
    });
  }
}

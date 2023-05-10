import { forkJoin } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsGeneral } from '@shared/constants';
import { ConductService } from '@core/services/conduct/conduct.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';

import { LevelService } from '@core/services/level/level.service';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import {
  IConductByLevel,
  IConductBySubcomponent,
} from '@shared/interfaces/conduct.interface';
import { CompetencesBuilderService } from '@modules/competences/services/competences-builder.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-behaviors-by-level',
  templateUrl: './behaviors-by-level.component.html',
  styleUrls: ['./behaviors-by-level.component.scss'],
})
export class BehaviorsByLevelComponent {
  public title = '';
  private subcomponent: ISubcomponent;

  public levelList: ILevel[] = [];
  public conductList: IConductBySubcomponent[];
  public conductsByLevel: IConductByLevel[];
  public conductFormGroup: FormGroup;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _levelService: LevelService,
    private _conductService: ConductService,
    private _activatedRoute: ActivatedRoute,
    private _competencesBuilderService: CompetencesBuilderService
  ) {
    this._activatedRoute.params.subscribe((params) => {
      this.subcomponent = JSON.parse(params['subcomponent']);
    });
    this.getLists();

    this.conductFormGroup = _competencesBuilderService.buildConductForm();
  }

  private getLists(): void {
    const levels = this._levelService.getAll();
    const conducts = this._conductService.conductBySubcomponent(
      this.subcomponent.id
    );

    forkJoin([levels, conducts]).subscribe(([levs, formls]) => {
      this.levelList = levs;
      this.conductList = formls;
      this.loadConducts();
    });
  }

  private loadConducts(): void {
    this.conductsByLevel = this.levelList.map((level) => {
      const conductFilter = this.conductList.filter(
        (cnd) => cnd.levelId === level.id
      );
      return { ...level, conducts: conductFilter };
    });

    this.conductsByLevel.forEach((lvl: IConductByLevel) => {
      lvl.conducts.forEach((cnd) => {
        this.conductPUSH(cnd);
      });
    });
  }

  public addItem(level: ILevel): void {
    const item: IConductBySubcomponent = {
      id: null,
      description: null,
      levelId: level.id,
      subcomponentId: this.subcomponent.id,
    } as IConductBySubcomponent;

    this.conductPUSH(item);
  }

  conductPUSH(conduct?: IConductBySubcomponent) {
    const fb = this._competencesBuilderService.buildItemsConductForm(conduct);
    this.itemsForm.push(fb);
  }

  public deleteItemConduct(pointIndex: number, item: any) {
    if (!item.value.id) {
      this.itemsForm.removeAt(pointIndex);
      return;
    }

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(item.value.id, pointIndex);
    });
  }

  public save(pointIndex: number, conduct: any): void {
    const conductValues: IConductBySubcomponent =
      conduct.value as IConductBySubcomponent;
    if (
      !conductValues.description?.length ||
      conductValues.description?.length === null
    )
      return;

    if (!conductValues.id) {
      this._conductService
        .create(conductValues)
        .subscribe((conduct: IConductBySubcomponent) => {
          this.controlsForm['itemsConduct']
            .get([pointIndex])
            ?.get('id')
            ?.setValue(conduct.id);
          this.controlsForm['itemsConduct']
            .get([pointIndex])
            ?.get('subcomponentId')
            ?.setValue(conduct.subcomponentId);
          this.showConfirmMessage('La conducta se creó correctamente.');
        });
    } else {
      this._conductService.update(conductValues).subscribe(() => {
        this.showConfirmMessage('La conducta se editó correctamente.');
      });
    }
  }

  private delete(id: string, pointIndex: number): void {
    this._conductService.delete(id).subscribe(() => {
      this.itemsForm.removeAt(pointIndex);
      this.showConfirmMessage('La conducta se eliminó correctamente.');
    });
  }

  get itemsForm(): FormArray {
    return this.conductFormGroup.get('itemsConduct') as FormArray;
  }

  private showConfirmMessage(message: string): void {
    this._snackBar.open(message, 'ok', {
      duration: 2500,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.conductFormGroup.controls;
  }
}

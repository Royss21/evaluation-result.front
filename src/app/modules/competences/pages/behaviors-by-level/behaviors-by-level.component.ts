import { forkJoin } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConstantsGeneral } from '@shared/constants';
import { ConductService } from '@core/services/conduct/conduct.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';

import { LevelService } from '@core/services/level/level.service';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { IConductByLevel, IConductBySubcomponent } from '@shared/interfaces/conduct.interface';
import { CompetencesBuilderService } from '@modules/competences/services/competences-builder.service';

@Component({
  selector: 'app-behaviors-by-level',
  templateUrl: './behaviors-by-level.component.html',
  styleUrls: ['./behaviors-by-level.component.scss']
})
export class BehaviorsByLevelComponent {

  public title: string = '';
  private subcomponent: ISubcomponent;

  public levelList: ILevel[] = [];
  public conductList: IConductBySubcomponent[];
  public conductsByLevel: IConductByLevel[];
  public conductFormGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _levelService: LevelService,
    private _conductService: ConductService,
    private _activatedRoute: ActivatedRoute,
    private _competencesBuilderService: CompetencesBuilderService
  ) {
     this._activatedRoute.params.subscribe(params => {
      this.subcomponent = JSON.parse(params['subcomponent']);
    });
    this.getLists();

    this.conductFormGroup = _competencesBuilderService.buildConductForm();
  }

  private getLists(): void {
    const levels = this._levelService.getAll();
    const conducts = this._conductService.conductBySubcomponent(this.subcomponent.id);

    forkJoin([levels, conducts])
      .subscribe(([ levs, formls ]) => {
        this.levelList = levs;
        this.conductList = formls;
        this.loadConducts();
      });
  }

  private loadConducts(): void {
    this.conductsByLevel = this.levelList.map(level => {
      const conductFilter = this.conductList.filter(cnd => cnd.levelId === level.id);
      return { ...level, conducts: conductFilter }
    });

    this.conductsByLevel.forEach((lvl: IConductByLevel) => {
      lvl.conducts.forEach(cnd => {
        this.conductPUSH(cnd)
      })
    });
  }

  public addItem(level: ILevel): void {
    const item: IConductBySubcomponent = {
      id: null,
      description: null,
      levelId: level.id,
      subcomponentId: this.subcomponent.id
    } as IConductBySubcomponent;

    this.conductPUSH(item);
  }

  conductPUSH(conduct?: IConductBySubcomponent) {
    const fb = this._competencesBuilderService.buildItemsConductForm(conduct)
    this.itemsForm.push(fb);
  }

  public deleteItemConduct(pointIndex: number, item: any) {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(item.value.id, pointIndex);
    });

  }

  public save(conduct: any): void {
    const conductValues: IConductBySubcomponent = conduct.value as IConductBySubcomponent;
    if (!conductValues.description?.length || conductValues.description?.length === null)
      return

    if (conductValues.id) {
      this._conductService.update(conductValues).subscribe(() => {
        console.log("UPDATED !!");
      });
    } else {
      this._conductService.create(conductValues).subscribe(() => {
        console.log("CREATED !!");
      });
    }
  }

  private delete(id: string, pointIndex: number): void{
    this._conductService
      .delete(id)
      .subscribe(() => {
        this.itemsForm.removeAt(pointIndex);
      });
  }

  get itemsForm(): FormArray {
    return this.conductFormGroup.get('itemsConduct') as FormArray;
  }

  itemsFormFiltered(id: number) {
    return this.itemsForm.controls.filter( x => x.get("levelId")?.value === id);
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.conductFormGroup.controls;
  }

}

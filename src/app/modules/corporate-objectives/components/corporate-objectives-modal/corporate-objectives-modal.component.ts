import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaService } from '@core/services/area/area.service';
import { FormulaService } from '@core/services/formula/formula.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { CorporateObjectivesText } from '@modules/corporate-objectives/helpers/corporate-objectives.helper';
import { ICorporateObjectives } from '@modules/corporate-objectives/interfaces/corporate-objectives.interface';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { forkJoin, Observable } from 'rxjs';
import { CorporateObjectivesModalBuilderService } from './corporate-objectives-modal-builder.service';

@Component({
  selector: 'app-corporate-objectives-modal',
  templateUrl: './corporate-objectives-modal.component.html',
  styleUrls: ['./corporate-objectives-modal.component.scss']
})
export class CorporateObjectivesModalComponent implements OnInit {

  modalTitle: string = '';
  areas: IArea[] = [];
  formulas: IFormula[] = [];
  corporateObjectivesFormGroup: FormGroup;

  constructor(
    private _corporateObjectivesBuilderService: CorporateObjectivesModalBuilderService,
    private _formulaService: FormulaService,
    private _areaService: AreaService,
    @Inject(MAT_DIALOG_DATA) public data: ICorporateObjectives
  ) { 
    this.modalTitle = data ? CorporateObjectivesText.modalUdpate : CorporateObjectivesText.modalCreate; 
    this.corporateObjectivesFormGroup = _corporateObjectivesBuilderService.buildCorporateObjectivesForm(data);
  }

  get areaControl(){
    return this.corporateObjectivesFormGroup.get('areaId') as FormControl;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.corporateObjectivesFormGroup.controls;
  }

  // get nameAreas(): string[]{
  //   return this.areas.map(a => a.name);
  // }

  ngOnInit(): void {

    let areaGetAll = this._areaService.getAll();
    let formulaGetAll = this._formulaService.getAll();
 
    forkJoin([areaGetAll, formulaGetAll])
      .subscribe(([areas, formulas]) => {
          this.areas = areas;
          this.formulas = formulas;
      });

  }

}

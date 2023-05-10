import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IComponentCollaboratorConduct } from '@modules/evaluate-component/interfaces/component-collaborator.interface';
import { ComponentCollaboratorEvaluateBuilderService } from '@modules/evaluate-component/services/component-collaborator-evaluate-builder.service';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-competency-card',
  templateUrl: './competency-card.component.html',
  styleUrls: ['./competency-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CompetencyCardComponent),
      multi: true,
    },
  ],
})
export class CompetencyCardComponent implements OnInit, ControlValueAccessor {
  @Input() id = 0;
  @Input() stageId = 0;
  @Input() subcomponentName = '';
  @Input() isCompleted: boolean;
  @Input() conducts: IComponentCollaboratorConduct[] = [];

  formGroupDetail: FormGroup = this._fb.group({
    componentCollaboratorConductsEvaluate: this._fb.array([]),
  });

  private _onChanged: Function = (detail: any) => {};
  private _onTouched: Function = () => {};

  constructor(
    private _fb: FormBuilder,
    private _formBuilder: ComponentCollaboratorEvaluateBuilderService
  ) {
    this.formGroupDetail.valueChanges.subscribe((value) => {
      const { componentCollaboratorConductsEvaluate } = value;

      componentCollaboratorConductsEvaluate.forEach(
        (cc: any) => (cc.isSelected = cc.pointValue > 0)
      );

      this._onTouched();
      this._onChanged?.(componentCollaboratorConductsEvaluate);
    });
  }

  get conductsEvaluate() {
    return this.formGroupDetail.controls[
      'componentCollaboratorConductsEvaluate'
    ] as FormArray;
  }

  get isStageEvaluation() {
    return this.stageId == ConstantsGeneral.stages.evaluation;
  }

  ngOnInit(): void {
    // this.conducts.forEach(c => {
    //   this.conductsEvaluate.push(this._formBuilder.buildComponentCollaboratorConductEvaluateForm(c));
    // })
  }

  writeValue(conducts: any): void {
    //console.log(obj);

    if (conducts)
      conducts.forEach((con: any) => {
        this.conductsEvaluate.push(
          this._formBuilder.buildComponentCollaboratorConductEvaluateForm(con)
        );
      });
    //obj && this.formGroupDetail.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}

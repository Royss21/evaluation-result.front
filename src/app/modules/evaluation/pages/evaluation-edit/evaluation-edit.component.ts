import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluationBuilderService } from '@modules/evaluation/services/evaluation-builder.service';

@Component({
  selector: 'app-evaluation-edit',
  templateUrl: './evaluation-edit.component.html',
  styleUrls: ['./evaluation-edit.component.scss']
})
export class EvaluationEditComponent{

  public title = 'Nueva evaluación';
  public evaluationFormGroup: FormGroup;
  public isRequiredAreaGoals: boolean;

  constructor(
    private _evaluationBuilderService: EvaluationBuilderService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.evaluationFormGroup = new FormGroup({
      configPeriodControl: new FormControl(),
      configCorpGoals: new FormControl(),
      configAreaGoals: this._evaluationBuilderService.builderCorpGoals(),
      configCompetences: new FormControl(),
    });

    this.evaluationFormGroup.controls['configPeriodControl']?.valueChanges
      .subscribe(value => {
        if (value?.components[1]?.checked) {
          this.isRequiredAreaGoals = true;
        } else {
          this.isRequiredAreaGoals = false;
        }
      })
  }

  public onClick(): void {
    console.log("FORM VALUES: ", this.evaluationFormGroup.controls)
  }

  //SHOW CONDITIONAL VIEW
  public get showConfigCorpGoals(): any {
    return this.evaluationFormGroup.controls['configPeriodControl']?.value?.components[0]?.checked;
  }

  public get showConfigAreaGoals(): any {
    return this.evaluationFormGroup.controls['configPeriodControl']?.value?.components[1]?.checked;
  }

  public get showConfigCompetences(): any {
    return this.evaluationFormGroup.controls['configPeriodControl']?.value?.components[2]?.checked;
  }

  //CONTROLS ACCESS
  get controlsPeriodForm() : any {
    return this.evaluationFormGroup.controls['configPeriodControl']?.value;
  }

  get controlsCorpGoalsForm() : any {
    return this.evaluationFormGroup.controls['configCorpGoals']?.value;
  }

  get controlsAreaGoalsForm() : any {
    return this.evaluationFormGroup.controls['configAreaGoals']?.value;
  }

  get controlsCompetencesForm() : any {
    return this.evaluationFormGroup.controls['configCompetences']?.value;
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluation-edit',
  templateUrl: './evaluation-edit.component.html',
  styleUrls: ['./evaluation-edit.component.scss']
})
export class EvaluationEditComponent {

  public title = 'Nueva evaluación';

  evaluationFormGroup = new FormGroup({
    configPeriodControl: new FormControl(),
    configCorpGoals: new FormControl(),
    configAreaGoals: new FormControl(),
    configCompetences: new FormControl(),
  });

  public onClick(): void {
    console.log("IS FORM VALID: ", this.evaluationFormGroup.valid)
  }

  get controlsPeriodForm() : any {
    return this.evaluationFormGroup.controls['configPeriodControl']?.value
  }

  get controlsCorpGoalsForm() : any {
    return this.evaluationFormGroup.controls['configCorpGoals']?.value
  }

  get controlsAreaGoalsForm() : any {
    return this.evaluationFormGroup.controls['configAreaGoals']?.value
  }

  get controlsCompetencesForm() : any {
    return this.evaluationFormGroup.controls['configCompetences']?.value
  }

}

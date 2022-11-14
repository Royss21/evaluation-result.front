import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IPeriod } from '@modules/period/interfaces/period.interface';

@Component({
  selector: 'app-evaluation-edit',
  templateUrl: './evaluation-edit.component.html',
  styleUrls: ['./evaluation-edit.component.scss']
})
export class EvaluationEditComponent {

  public title = 'Nueva evaluación';

  evaluationFormGroup = new FormGroup({
    configPeriodControl: new FormControl(),
    configCorpGoals: new FormControl()
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

}

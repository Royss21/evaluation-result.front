import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Period } from 'src/app/shared/models/period/period.model';
import { CustomValidations } from 'src/app/shared/helpers/custom-validations';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.scss']
})
export class PeriodEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<any>();

  isNew = true;
  title = 'Nuevo periodo';

  periodData: Period | undefined;
  periodForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this._route.data.subscribe((data: { period: Period }) => {
    //   this.periodData = data?.period;
    //   if (data?.period?.id) {
    //     this.isNew = false;
    //     this.title = 'Editar periodo';
    //   }
    // });
    this.periodForm = this.buildPeriodForm();
  }

  ngOnInit(): void {
    //
  }

  public goBack(): void {
    this.router.navigate(['/period/list']).then(r => {});
  }

  public save(): void {
    //
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.periodForm.controls;
  }

  private buildPeriodForm(): FormGroup {
    return this.fb.group({
      id: [this.periodData?.id || 0],
      name: [
        this.periodData?.name || null,
        [
          Validators.required,
          CustomValidations.NotEmpty,
          Validators.maxLength(70)
        ]
      ],
      description: [
        (this.periodData?.description || ''),
        [Validators.maxLength(500)]
      ],
      state: [this.periodData?.state === 1]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

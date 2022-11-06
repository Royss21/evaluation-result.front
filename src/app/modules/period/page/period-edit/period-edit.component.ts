import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AbstractControl, FormGroup } from '@angular/forms';

import { AppConstants } from '@shared/constants/app.constants';
import { PeriodService } from '@modules/period/service/period-builder.service';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.scss']
})
export class PeriodEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<any>();

  isNew = true;
  title = 'Nuevo periodo';

  periodFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _periodService: PeriodService
  ) {
    if (this._route.snapshot.params['id']) {
      this.isNew = false;
      this.title = 'Editar periodo';
      //Call WS Get Period by Id
    }
    this.periodFormGroup = this._periodService.buildPeriodForm();
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

  public keypress(event: any): boolean {
    const regex = new RegExp(AppConstants.ExpresionRegular.Text);
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
    return true;
  }

  get controlsForm(): { [key: string]: AbstractControl } {
    return this.periodFormGroup.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'
import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ConstantsGeneral } from '@shared/constants';
import { AppConstants } from '@shared/constants/app.constants';
import { PeriodService } from '@core/services/period/period.service';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { PeriodBuilderService } from '@modules/period/service/period-builder.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';

@Component({
  selector: 'app-period-edit',
  templateUrl: './period-edit.component.html',
  styleUrls: ['./period-edit.component.scss']
})
export class PeriodEditComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<any>();

  public isNew = true;
  public title = 'Nuevo periodo';

  periodFormGroup: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public _dialog: MatDialog,
    private _periodService: PeriodService,
    private _periodBuilderService: PeriodBuilderService
  ) {
    if (this._route.snapshot.params['id']) {
      this.isNew = false;
      this.title = 'Editar periodo';
      //Call WS Get Period by Id
    }
    this.periodFormGroup = this._periodBuilderService.buildPeriodForm();
  }

  ngOnInit(): void {
    //
  }

  public goBack(): void {
    this.router.navigate(['/period/list']).then(r => {});
  }

  public save(): void {
    if ( this.periodFormGroup.invalid ) {
      return;
    }

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });


    let body = this.periodFormGroup.getRawValue() as IPeriod;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._periodService
        .create(body)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.showConfirmMessage());
      }
    });
  }

  showConfirmMessage() {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.confirmCreatePopup,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.goBack();
    });
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

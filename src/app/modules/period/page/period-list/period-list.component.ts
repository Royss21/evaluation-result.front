import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IPopupConfirm } from '@components/popup-interface';
import { PeriodService } from '@core/services/period/period.service';
import { PeriodHelper } from '@modules/period/helpers/period.helper';
import { IPeriod } from '@modules/period/interfaces/period.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { PeriodModalComponent } from '@modules/period/components/period-modal/period-modal.component';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent {

  public title = PeriodHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  periodPaginated$: Observable<any>;
  paginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  periodPaginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  warningPopup: IPopupConfirm = {
    icon:'warning_amber',
    iconColor: 'color-warning',
    text: 'Existe una evaluacion asignada a este periodo',
    buttonLabelAccept: 'Aceptar'
  }

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    private _periodService: PeriodService,
  ){
    this.periodPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.periodPaginated$ = this.periodPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = PeriodHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated() {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._periodService.getPaginated(paginatedFilter)
          .subscribe(paginated => this.periodPaginatedBehavior.next(paginated));
        }
    });
  }

  private openModal(period?: IPeriod): void {

    const modalPeriod = this._dialog.open(PeriodModalComponent, {
      data: period,
      disableClose: true,
      width: ConstantsGeneral.mdModal
    });

    modalPeriod.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  createPeriod(): void{
    this.openModal();
  }

  updatePeriod(period: IPeriod): void{
    this.openModal(period);
  }

  confirmDeleted(id: number): void {
    this._periodService.checkExistEvaluationInProgress(id).subscribe(isAssigned => {
      if (isAssigned) {
        this._dialog.open(PopupConfirmComponent, {
          data: this.warningPopup,
          autoFocus: false,
        });
      } else {
        const dialogRef = this._dialog.open(PopupChooseComponent, {
          data: ConstantsGeneral.chooseDelete,
          autoFocus: false,
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) this.delete(id);
        });
      }
    });
  }

  private delete(id: number): void{
    this._periodService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

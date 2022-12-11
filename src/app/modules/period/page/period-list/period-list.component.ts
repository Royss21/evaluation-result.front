import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { PeriodHelper } from '@modules/period/helpers/period.helper';
import { PeriodService } from '@core/services/period/period.service';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { PopupConfirmComponent } from '@components/popup-confirm/popup-confirm.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IPaginatedResponse } from '@core/interfaces/paginated-response.interface';
import { IPeriod } from '@modules/period/interfaces/period.interface';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent {

  private unsubscribe$ = new Subject<any>();

  periodPaginated$: Observable<any>;
  paginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  periodPaginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

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

  public goToNewPeriod(): void {
    this._router.navigate(['/period/edit']).then(() => {});
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

  public editPeriod(id: number): void {
    this._router.navigate([`/period/edit/${id}`]).then(() => {});
  }

  public goEvaluation(period: IPeriod): void {
    this._router.navigateByUrl(`/evaluation/add`, { state: period }).then(() => {});
  }

  public confirmDeleted(idPeriod: number): void {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseData,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._periodService
        .delete(idPeriod)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.showConfirmMessage());
      }
    });
  }

  showConfirmMessage() {
    const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false
    });

    dialogRefConfirm.afterClosed().subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
      this._dialog.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { PeriodService } from '@core/services/period/period.service';
import { ElementRowTable } from '@components/table/models/table.model';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
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
  // columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  columnsTable: IElementRowTable[] =  [
    new ElementRowTable('id','#'),
    new ElementRowTable('name','Nombre'),
    new ElementRowTable('startDate','Fecha de Inicio'),
    new ElementRowTable('endDate','Fecha de Fin'),
    new ElementRowTable('actions','Acciones')
  ];

  constructor(
    private router: Router,
    private _periodService: PeriodService,
  ){
    this.periodPaginated$ = new Observable<any>();
    this.paginatedBehavior = new BehaviorSubject(null);
    this. paginated$ = this.paginatedBehavior.asObservable();
    // this.columnsTable = ColorHelper.columnasTabla;
  }

  public goToNewPeriod(): void {
    this.router.navigate(['/period/edit']).then(() => {});
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated() {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
      this.paginatedFilterCurrent = paginatedFilter;
      this.periodPaginated$ = this._periodService.getPaginated(paginatedFilter);
    });
  }

  editPeriod(period: IPeriod): void {
    this.router.navigate([`/period/edit/${period.id}`]).then(() => {});
  }

  confirmDeleted(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

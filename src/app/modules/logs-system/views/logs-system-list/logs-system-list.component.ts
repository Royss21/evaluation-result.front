import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { AuditService } from '@core/services/audit-entity/audit-entity.service';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { LogSystemHelper } from '@modules/logs-system/helpers/log-system-helper.interface';
import { ShowInfoLogComponent } from '@modules/logs-system/components/show-info-log/show-info-log.component';

@Component({
  selector: 'app-logs-system-list',
  templateUrl: './logs-system-list.component.html',
  styleUrls: ['./logs-system-list.component.scss'],
})
export class LogsSystemListComponent {
  public title: string = LogSystemHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  paginated$: Observable<any>;
  columnsTable: IElementRowTable[];
  logSystemPaginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  paginatedFilterCurrent: IPaginatedFilter;
  logSystemPaginatedBehavior: BehaviorSubject<any>;

  constructor(public _dialog: MatDialog, private _auditService: AuditService) {
    this.logSystemPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.logSystemPaginated$ = this.logSystemPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = LogSystemHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$.subscribe((paginatedFilter: IPaginatedFilter) => {
      if (paginatedFilter) {
        this.paginatedFilterCurrent = paginatedFilter;
        this._auditService
          .getPaginatedLog(paginatedFilter)
          .subscribe((paginated) =>
            this.logSystemPaginatedBehavior.next(paginated)
          );
      }
    });
  }

  public showModalInfo(logInfoElement: string, logNameElement: string): void {
    this.openModal(logInfoElement, logNameElement);
  }

  private openModal(logInfoElement: string, logNameElement: string): void {
    const modalLevel = this._dialog.open(ShowInfoLogComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: { textValue: logInfoElement, nameField: logNameElement },
    });

    modalLevel.afterClosed().subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

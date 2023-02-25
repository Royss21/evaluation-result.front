import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { AuditService } from '@core/services/audit-entity/audit-entity.service';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { AuditEntityHelper } from '@modules/audit-entity/helpers/audit-entity-helper.interface';
import { ShowValueComponent } from '@modules/audit-entity/components/show-value/show-value.component';

@Component({
  selector: 'app-audit-entity-list',
  templateUrl: './audit-entity-list.component.html',
  styleUrls: ['./audit-entity-list.component.scss']
})
export class AuditEntityListComponent {

  public title: string = AuditEntityHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  paginated$: Observable<any>;
  columnsTable: IElementRowTable[];
  auditEntityPaginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  paginatedFilterCurrent: IPaginatedFilter;
  auditEntityPaginatedBehavior: BehaviorSubject<any>;

  constructor(
    public _dialog: MatDialog,
    private _auditService: AuditService,
  ){
    this.auditEntityPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.auditEntityPaginated$ = this.auditEntityPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = AuditEntityHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._auditService.getPaginatedEntity(paginatedFilter)
            .subscribe(paginated => this.auditEntityPaginatedBehavior.next(paginated));
        }
      });
  }

  public showModalInfo(auditElement: string, auditNameElement: string): void {
    this.openModal(auditElement, auditNameElement);
  }

  private openModal(auditElement: string, auditNameElement: string): void {
    const modalLevel = this._dialog.open(ShowValueComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: { textValue: auditElement, nameField: auditNameElement }
    });

    modalLevel.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

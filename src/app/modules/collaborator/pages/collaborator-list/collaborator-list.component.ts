import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { CollaboratorService } from '@core/services/collaborator/collaborator.service';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { CollaboratorHelper } from '@modules/collaborator/helpers/collaborator.helpers';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent {

  private unsubscribe$ = new Subject<any>();

  paginated$: Observable<any>;
  columnsTable: IElementRowTable[];
  collaboratorPaginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  paginatedFilterCurrent: IPaginatedFilter;
  collaboratorPaginatedBehavior: BehaviorSubject<any>;

  constructor(
    public _dialog: MatDialog,
    public _collaboratorService: CollaboratorService
  ) {
    this.collaboratorPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.collaboratorPaginated$ = this.collaboratorPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = CollaboratorHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._collaboratorService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.collaboratorPaginatedBehavior.next(paginated));
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

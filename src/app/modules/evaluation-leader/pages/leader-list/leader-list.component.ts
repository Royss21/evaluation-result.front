import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { LeaderHelper } from '@modules/evaluation-leader/helpers/leader.helper';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { LeaderService } from '@core/services/evaluation-leader/leader.service';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { ILeaderPaged } from '@modules/evaluation-leader/interfaces/leader-paged.interface';
import { LeaderImportModalComponent } from '@modules/evaluation-leader/components/leader-import-modal/leader-import-modal.component';
import { AssignedCollaboratorsModalComponent } from '@modules/evaluation-leader/components/assigned-collaborators-modal/assigned-collaborators-modal.component';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss']
})
export class LeaderListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();
  private _evaluationId: string = '';

  leaderPaginated$: Observable<any>;
  paginated$: Observable<any>;
  leaderPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _leaderService: LeaderService,
    private _route: ActivatedRoute
  ){
    this.leaderPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.leaderPaginated$ = this.leaderPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = LeaderHelper.columnsTable;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => this._evaluationId = params['evaluationId']);
  }

  ngAfterContentInit() {
    this._callPaginated();
  }

  private _callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._leaderService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.leaderPaginatedBehavior.next(paginated));
        }
      });
  }

  openModalViewAssignedCollaborators(leader: ILeaderPaged){

      const modalLeaderImport = this._dialog.open(AssignedCollaboratorsModalComponent, {
        disableClose: true,
        data: {
          evaluationLeaderId: leader.id,
          componentId: leader.componentId
        },
        autoFocus: false,
        restoreFocus: false
      });

      modalLeaderImport.afterClosed()
        .subscribe(() => {
          this.paginatedBehavior.next(this.paginatedFilterCurrent);
        });
  }

  openModalImport(): void {

    const modalLeaderImport = this._dialog.open(LeaderImportModalComponent, {
    //const modalLeaderImport = this._dialog.open(AssignedCollaboratorsModalComponent, {
      disableClose: true,
      data: this._evaluationId,
      autoFocus: false,
      restoreFocus: false
    });

    modalLeaderImport.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

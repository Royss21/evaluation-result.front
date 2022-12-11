import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { LeaderService } from '@core/services/evaluation-leader/leader.service';
import { AssignedCollaboratorsModalComponent } from '@modules/evaluation-leader/components/assigned-collaborators-modal/assigned-collaborators-modal.component';
import { LeaderImportModalComponent } from '@modules/evaluation-leader/components/leader-import-modal/leader-import-modal.component';
import { LeaderHelper } from '@modules/evaluation-leader/helpers/leader.helper';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss']
})
export class LeaderListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();

  leaderPaginated$: Observable<any>;
  paginated$: Observable<any>;
  leaderPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _leaderService: LeaderService,
  ){
    this.leaderPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.leaderPaginated$ = this.leaderPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = LeaderHelper.columnsTable;
  }
  ngOnInit(): void {
    
  }
  
  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._leaderService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.leaderPaginatedBehavior.next(paginated));
        }
      });
  }

  openModalImport(): void {

    const modalLeaderImport = this._dialog.open(LeaderImportModalComponent, {
    //const modalLeaderImport = this._dialog.open(AssignedCollaboratorsModalComponent, {
      disableClose: true,
      data: 'DEF6B939-A6D1-41B0-8BF5-B5994550EDE3',
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

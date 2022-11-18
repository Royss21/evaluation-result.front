import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { LevelService } from '@core/services/level/level.service';
import { LevelHelper } from '@modules/level/helpers/level.helper';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();

  levelPaginated$: Observable<any>;
  paginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    private router: Router,
    public _dialog: MatDialog,
    private _levelService: LevelService,
  ){
    this.levelPaginated$ = new Observable<any>();
    this.paginatedBehavior = new BehaviorSubject(null);
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = LevelHelper.columnsTable;
  }
  ngOnInit(): void {
    
  }

  // public goToNewPeriod(): void {
  //   this.router.navigate(['/period/edit']).then(() => {});
  // }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated() {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
      this.paginatedFilterCurrent = paginatedFilter;
      this.levelPaginated$ = this._levelService.getPaginated(paginatedFilter);
    });
  }

  // public editPeriod(id: number): void {
  //   this.router.navigate([`/period/edit/${id}`]).then(() => {});
  // }

  // public goEvaluation(id: number): void {
  //   this.router.navigate([`/evaluation/edit/${id}`]).then(() => {});
  // }

  // public confirmDeleted(idPeriod: number): void {
  //   const dialogRef = this._dialog.open(PopupChooseComponent, {
  //     data: ConstantsGeneral.chooseData,
  //     autoFocus: false,
  //     restoreFocus: false
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this._periodService
  //       .delete(idPeriod)
  //       .pipe(takeUntil(this.unsubscribe$))
  //       .subscribe(() => this.showConfirmMessage());
  //     }
  //   });
  // }

  // showConfirmMessage() {
  //   const dialogRefConfirm = this._dialog.open(PopupConfirmComponent, {
  //     data: ConstantsGeneral.chooseDelete,
  //     autoFocus: false
  //   });

  //   dialogRefConfirm.afterClosed().subscribe(() => {
  //     this.callPaginated();
  //     this._dialog.closeAll();
  //   });
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

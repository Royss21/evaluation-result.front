import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { LevelHelper } from '@modules/level/helpers/level.helper';
import { LevelService } from '@core/services/level/level.service';
import { ILevel } from '@modules/level/interfaces/level.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { LevelModalComponent } from '@modules/level/components/level-modal/level-modal.component';


@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent {

  private unsubscribe$ = new Subject<any>();

  levelPaginated$: Observable<any>;
  paginated$: Observable<any>;
  levelPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _levelService: LevelService,
  ){
    this.levelPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.levelPaginated$ = this.levelPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = LevelHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._levelService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.levelPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(level?: ILevel): void {
    const modalLevel = this._dialog.open(LevelModalComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: level
    });

    modalLevel.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._levelService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  create(): void{
    this.openModal();
  }

  update(level: ILevel): void{
    this.openModal(level);
  }

  confirmDeleted(id: number): void {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(id);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

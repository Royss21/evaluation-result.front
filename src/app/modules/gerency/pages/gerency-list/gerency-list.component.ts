import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { GerencyService } from '@core/services/gerency/gerency.service';
import { GerencyHelper } from '@modules/gerency/helpers/gerency.helper';
import { IGerency } from '@modules/gerency/interfaces/gerency.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { GerencyModalComponent } from '@modules/gerency/components/gerency-modal/gerency-modal.component';

@Component({
  selector: 'app-gerency-list',
  templateUrl: './gerency-list.component.html',
  styleUrls: ['./gerency-list.component.scss'],
})
export class GerencyListComponent {
  public title = GerencyHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  gerencyPaginated$: Observable<any>;
  paginated$: Observable<any>;
  gerencyPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _gerencyService: GerencyService
  ) {
    this.gerencyPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.gerencyPaginated$ = this.gerencyPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = GerencyHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$.subscribe((paginatedFilter: IPaginatedFilter) => {
      if (paginatedFilter) {
        this.paginatedFilterCurrent = paginatedFilter;
        this._gerencyService
          .getPaginated(paginatedFilter)
          .subscribe((paginated) =>
            this.gerencyPaginatedBehavior.next(paginated)
          );
      }
    });
  }

  private openModal(gerency?: IGerency): void {
    const modalGerency = this._dialog.open(GerencyModalComponent, {
      data: gerency,
      disableClose: true,
      width: ConstantsGeneral.mdModal,
    });

    modalGerency.afterClosed().subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  createGerency(): void {
    this.openModal();
  }

  updateGerency(gerency: IGerency): void {
    this.openModal(gerency);
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

  private delete(id: number): void {
    this._gerencyService.delete(id).subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
      this._dialog.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

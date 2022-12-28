import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { AreaService } from '@core/services/area/area.service';
import { IArea } from '@modules/area/interfaces/area.interface';
import { AreaHelper } from '@modules/area/helpers/area-helper.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { AreaModalComponent } from '@modules/area/components/area-modal/area-modal.component';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent {

  public title: string = AreaHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  areaPaginated$: Observable<any>;
  paginated$: Observable<any>;
  areaPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _areaService: AreaService,
  ){
    this.areaPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.areaPaginated$ = this.areaPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = AreaHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._areaService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.areaPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(area?: IArea): void {
    const modalLevel = this._dialog.open(AreaModalComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: area
    });

    modalLevel.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._areaService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  create(): void{
    this.openModal();
  }

  update(area: IArea): void{
    this.openModal(area);
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

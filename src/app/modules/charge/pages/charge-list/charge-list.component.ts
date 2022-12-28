import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ChargeService } from '@core/services/charge/charge.service';
import { ChargeModalComponent } from '@modules/charge/components/charge-modal/charge-modal.component';
import { ChargeHelper } from '@modules/charge/helpers/charge-helper.interface';
import { ICharge } from '@modules/charge/interfaces/charge.interface';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.scss']
})
export class ChargeListComponent {

  public title: string = ChargeHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  chargePaginated$: Observable<any>;
  paginated$: Observable<any>;
  chargePaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _chargeService: ChargeService,
  ){
    this.chargePaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.chargePaginated$ = this.chargePaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = ChargeHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._chargeService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.chargePaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(charge?: ICharge): void {
    const modalLevel = this._dialog.open(ChargeModalComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: charge
    });

    modalLevel.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._chargeService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  create(): void{
    this.openModal();
  }

  update(charge: ICharge): void{
    this.openModal(charge);
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

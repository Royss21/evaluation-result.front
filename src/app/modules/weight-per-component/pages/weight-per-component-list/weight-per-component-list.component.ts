import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { WeightPerComponentService } from '@core/services/weight-per-component/weight-per-component.service';
import { WeightPerComponentHelper } from '@modules/weight-per-component/helpers/weight-per-component.helper';
import { IWeightPerComponent } from '@modules/weight-per-component/interfaces/weight-per-component.interface';
import { WeightPerComponentModalComponent } from '@modules/weight-per-component/components/weight-per-component-modal/weight-per-component-modal.component';

@Component({
  selector: 'app-weight-per-component-list',
  templateUrl: './weight-per-component-list.component.html',
  styleUrls: ['./weight-per-component-list.component.scss']
})
export class WeightPerComponentListComponent {

  public title = WeightPerComponentHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  public paginated$: Observable<any>;
  public columnsTable: IElementRowTable[];
  public paginatedBehavior: BehaviorSubject<any>;
  public paginatedFilterCurrent: IPaginatedFilter;
  public weightPerComponentPaginated$: Observable<any>;
  public weightPerComponentPaginatedBehavior: BehaviorSubject<any>;

  constructor(
    public _dialog: MatDialog,
    private _weightPerComponentService: WeightPerComponentService
  ) {
    this.weightPerComponentPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.weightPerComponentPaginated$ = this.weightPerComponentPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = WeightPerComponentHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._weightPerComponentService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.weightPerComponentPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(weightPerComponent?: IWeightPerComponent): void {

    const modalRef = this._dialog.open(WeightPerComponentModalComponent, {
      disableClose: true,
      data: weightPerComponent,
      width: ConstantsGeneral.mdModal
    });

    modalRef.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  createWeightPerComponent(): void{
    this.openModal();
  }

  updateWeightPerComponent(weightPerComponent: IWeightPerComponent): void{
    this.openModal(weightPerComponent);
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

  private delete(id: number): void{
    this._weightPerComponentService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

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
import { HierarchyService } from '@core/services/hierarchy/hierarchy.service';
import { IHierarchy } from '../../../hierarchy/interfaces/hierarchy.interface';

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
    private _hierarchyService: HierarchyService,
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
          this._hierarchyService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.weightPerComponentPaginatedBehavior.next(paginated));
        }
      });
  }

  public openModal(hierarchy?: IHierarchy): void {
    const modalRef = this._dialog.open(WeightPerComponentModalComponent, {
      disableClose: true,
      data: hierarchy,
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

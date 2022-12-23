import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { HierarchyService } from '@core/services/hierarchy/hierarchy.service';
import { HierarchyModalComponent } from '@modules/hierarchy/components/hierarchy-modal/hierarchy-modal.component';
import { HierarchyHelper } from '@modules/hierarchy/helpers/hierarchy.helper';
import { IHierarchy } from '@modules/hierarchy/interfaces/hierarchy.interface';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-hierarchy-list',
  templateUrl: './hierarchy-list.component.html',
  styleUrls: ['./hierarchy-list.component.scss']
})
export class HierarchyListComponent {

  public title: string = HierarchyHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  hierarchyPaginated$: Observable<any>;
  paginated$: Observable<any>;
  hierarchyPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _hierarchyService: HierarchyService,
  ) {
    this.hierarchyPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.hierarchyPaginated$ = this.hierarchyPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = HierarchyHelper.columnsTable;
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
            .subscribe(paginated => this.hierarchyPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(hierarchy?: IHierarchy): void {

    const modalHierarchy = this._dialog.open(HierarchyModalComponent, {
      disableClose: true,
      data: hierarchy
    });

    modalHierarchy.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._hierarchyService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  createHierarchy(): void{
    this.openModal();
  }

  updateHierarchy(hierarchy: IHierarchy): void {
    this.openModal(hierarchy);
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

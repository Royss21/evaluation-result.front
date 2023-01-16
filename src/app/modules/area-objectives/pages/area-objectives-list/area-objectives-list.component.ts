import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ISubcomponentFilter } from '@shared/interfaces/subcomponent-filter.interface';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { AreaObjectivesHelper } from '@modules/area-objectives/helpers/area-objectives-helper.interface';
import { AssignChargesModalComponent } from '@modules/area-objectives/components/assign-charges-modal/assign-charges-modal.component';
import { AreaObjectivesModalComponent } from '@modules/area-objectives/components/area-objectives-modal/area-objectives-modal.component';

@Component({
  selector: 'app-area-objectives-list',
  templateUrl: './area-objectives-list.component.html',
  styleUrls: ['./area-objectives-list.component.scss']
})
export class AreaObjectivesListComponent {

  public title: string = AreaObjectivesHelper.titleActions.list;
  private unsubscribe$ = new Subject<any>();

  corporateObjectivesPaginated$: Observable<any>;
  paginated$: Observable<any>;
  areaObjectivesPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _subcomponentService: SubcomponentService,
  ){
    this.areaObjectivesPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.corporateObjectivesPaginated$ = this.areaObjectivesPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = AreaObjectivesHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: ISubcomponentFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._subcomponentService.getPaginated({ ...paginatedFilter, componentId: ConstantsGeneral.components.areaObjectives })
            .subscribe(paginated => this.areaObjectivesPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(typeModal: number, subcomponent?: ISubcomponent): void {

    const modal: any = typeModal === 1 ? AreaObjectivesModalComponent : AssignChargesModalComponent;
    const widthModal = typeModal === 1 ? ConstantsGeneral.mdModal : ConstantsGeneral.xlModal;

    const modalcorporateObjectives = this._dialog.open(modal, {
      width: widthModal,
      disableClose: true,
      data: subcomponent
    });

    modalcorporateObjectives.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._subcomponentService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  public create(): void{
    this.openModal( 1);
  }

  public update(subcomponent: ISubcomponent): void{
    this.openModal(1, subcomponent );
  }

  public assign(subcomponent: ISubcomponent): void {
    this.openModal(2, subcomponent);
  }

  public confirmDeleted(id: number): void {
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

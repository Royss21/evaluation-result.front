import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { ISubcomponent } from '@shared/interfaces/subcomponent.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ISubcomponentFilter } from '@shared/interfaces/subcomponent-filter.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { CorporateObjectivesHelper } from '@modules/corporate-objectives/helpers/corporate-objectives.helper';
import { AssignChargeModalComponent } from '@modules/corporate-objectives/components/assign-charge-modal/assign-charge-modal.component';
import { CorporateObjectivesModalComponent } from '@modules/corporate-objectives/components/corporate-objectives-modal/corporate-objectives-modal.component';

@Component({
  selector: 'app-corporate-objectives-list',
  templateUrl: './corporate-objectives-list.component.html',
  styleUrls: ['./corporate-objectives-list.component.scss']
})
export class CorporateObjectivesListComponent {

  private unsubscribe$ = new Subject<any>();

  corporateObjectivesPaginated$: Observable<any>;
  paginated$: Observable<any>;
  corporateObjectivesPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _subcomponentService: SubcomponentService,
  ){
    this.corporateObjectivesPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.corporateObjectivesPaginated$ = this.corporateObjectivesPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = CorporateObjectivesHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: ISubcomponentFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._subcomponentService.getPaginated({ ...paginatedFilter, componentId: ConstantsGeneral.components.corporateObjectives })
            .subscribe(paginated => this.corporateObjectivesPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(typeModal: number, subcomponent?: ISubcomponent): void {

    const modal: any = typeModal === 1 ? CorporateObjectivesModalComponent : AssignChargeModalComponent;
    const widthModal = typeModal === 1 ? ConstantsGeneral.lgModal : ConstantsGeneral.xlModal;

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

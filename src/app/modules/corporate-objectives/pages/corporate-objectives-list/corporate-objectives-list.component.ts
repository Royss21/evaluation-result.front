import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { SubcomponentService } from '@core/services/subcomponent/subcomponent.service';
import { ISubcomponentFilter } from '@shared/interfaces/subcomponent-filter.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { CorporateObjectivesHelper } from '@modules/corporate-objectives/helpers/corporate-objectives.helper';
import { ICorporateObjectives } from '@modules/corporate-objectives/interfaces/corporate-objectives.interface';
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

  private openModal(corporateObjectives?: ICorporateObjectives): void {

    const modalcorporateObjectives = this._dialog.open(CorporateObjectivesModalComponent, {
      width: ConstantsGeneral.lgModal,
      disableClose: true,
      data: corporateObjectives
    });

    modalcorporateObjectives.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    // this._corporateObjectivesService
    //   .delete(id)
    //   .subscribe(() => {
    //     this.paginatedBehavior.next(this.paginatedFilterCurrent);
    //     this._dialog.closeAll();
    //   });
  }

  create(): void{
    this.openModal();
  }

  update(corporateObjectives: ICorporateObjectives): void{
    this.openModal(corporateObjectives);
  }

  confirmDeleted(id: number): void {
    // const dialogRef = this._dialog.open(PopupChooseComponent, {
    //   data: ConstantsGeneral.chooseDelete,
    //   autoFocus: false,
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) this.delete(id);
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

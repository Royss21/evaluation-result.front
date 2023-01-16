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
import { CompetencesHelper } from '@modules/competences/helpers/competences-helper.interface';
import { CompetencesModalComponent } from '@modules/competences/components/competences-modal/competences-modal.component';

@Component({
  selector: 'app-competences-list',
  templateUrl: './competences-list.component.html',
  styleUrls: ['./competences-list.component.scss']
})
export class CompetencesListComponent {

  public title: string = CompetencesHelper.titleActions.list;
  private unsubscribe$ = new Subject<any>();

  paginated$: Observable<any>;
  columnsTable: IElementRowTable[];
  competencesPaginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  paginatedFilterCurrent: IPaginatedFilter;
  competencesPaginatedBehavior: BehaviorSubject<any>;

  constructor(
    public _dialog: MatDialog,
    private _subcomponentService: SubcomponentService,
  ){
    this.competencesPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.competencesPaginated$ = this.competencesPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = CompetencesHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: ISubcomponentFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._subcomponentService.getPaginated({ ...paginatedFilter, componentId: ConstantsGeneral.components.competencies })
            .subscribe(paginated => this.competencesPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(typeModal: number, subcomponent?: ISubcomponent): void {

    const modal: any = typeModal === 1 ? CompetencesModalComponent : CompetencesModalComponent;//TODO
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

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { CollaboratorService } from '@core/services/collaborator/collaborator.service';
import { CollaboratorHelper } from '@modules/collaborator/helpers/collaborator.helpers';
import { ICollaborator } from '../../interfaces/collaboator-not-in-evaluation.interface';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { CollaboratorModalComponent } from '@modules/collaborator/components/collaborator-modal/collaborator-modal.component';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss']
})
export class CollaboratorListComponent {

  private unsubscribe$ = new Subject<any>();

  paginated$: Observable<any>;
  columnsTable: IElementRowTable[];
  collaboratorPaginated$: Observable<any>;
  paginatedBehavior: BehaviorSubject<any>;
  paginatedFilterCurrent: IPaginatedFilter;
  collaboratorPaginatedBehavior: BehaviorSubject<any>;

  constructor(
    public _dialog: MatDialog,
    public _collaboratorService: CollaboratorService
  ) {
    this.collaboratorPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.collaboratorPaginated$ = this.collaboratorPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = CollaboratorHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._collaboratorService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.collaboratorPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(collaborator?: ICollaborator): void {
    const collaboratorModal = this._dialog.open(CollaboratorModalComponent, {
      width: ConstantsGeneral.xlModal,
      disableClose: true,
      data: collaborator
    });

    collaboratorModal.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  create(): void{
    this.openModal();
  }

  update(collaborator: ICollaborator): void{
    this.openModal(collaborator);
  }

  confirmDeleted(id: string): void {

    this._collaboratorService.validateCurrentEvaluation(id)
      .subscribe(isTrue => {

        const dataMessage = {...ConstantsGeneral.chooseDelete};

        if(isTrue)
          dataMessage.text = "El colaborador se encuentra en una evaluación en curso.\n ¿Estás seguro de eliminar el registro? ";

        const dialogRef = this._dialog.open(PopupChooseComponent, {
          data: dataMessage,
          autoFocus: false,
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) this._delete(id);
        });
      });

    
  }

  private _delete(id: string): void{
    this._collaboratorService
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

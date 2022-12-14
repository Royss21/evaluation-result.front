import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { EvaluationCollaboratorService } from '@core/services/evaluation-collaborator/evaluation-collaborator.service';
import { RegisterCollaboratorModalComponent } from '@modules/evaluation-collaborator/components/register-collaborator-modal/register-collaborator-modal.component';
import { EvaluationCollaboratorHelper } from '@modules/evaluation-collaborator/helpers/evaluation-collaborator.helper';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-evaluation-collaborator-list',
  templateUrl: './evaluation-collaborator-list.component.html',
  styleUrls: ['./evaluation-collaborator-list.component.scss']
})
export class EvaluationCollaboratorListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();
  private _evaluationId: string = '';
  evaluationCollaboratorPaginated$: Observable<any>;
  paginated$: Observable<any>;
  evaluationCollaboratorPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;
  

  constructor(
    public _dialog: MatDialog,
    private _evaluationCollaboratorService: EvaluationCollaboratorService,
    private _route: ActivatedRoute
  ){
    this.evaluationCollaboratorPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.evaluationCollaboratorPaginated$ = this.evaluationCollaboratorPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = EvaluationCollaboratorHelper.columnsTable;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => this._evaluationId = params['evaluationId']);
  }
  
  ngAfterContentInit() {
    this._callPaginated();
  }

  private _callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._evaluationCollaboratorService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.evaluationCollaboratorPaginatedBehavior.next(paginated));
        }
      });
  }

  private _delete(id:string): void{
    this._evaluationCollaboratorService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  openModal(): void {

    const modalRegsiterCollaborator = this._dialog.open(RegisterCollaboratorModalComponent, {
      disableClose: true,
      data: this._evaluationId,
      autoFocus: false,
      restoreFocus: false
    });

    modalRegsiterCollaborator.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  confirmDeleted(id: string): void {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this._delete(id);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

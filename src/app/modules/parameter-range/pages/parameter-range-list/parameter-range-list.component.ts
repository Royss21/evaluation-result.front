import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ParameterRangeService } from '@core/services/paramater-range/parameter-range.service';
import { ParameterRangeModalComponent } from '@modules/parameter-range/components/parameter-range-modal/parameter-range-modal.component';
import { ParameterValueModalComponent } from '@modules/parameter-range/components/parameter-value-modal/parameter-value-modal.component';
import { ParameterRangeHelper } from '@modules/parameter-range/helpers/parameter-range.helper';
import { IParameterRange } from '@modules/parameter-range/interfaces/parameter-range.interface';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-parameter-range-list',
  templateUrl: './parameter-range-list.component.html',
  styleUrls: ['./parameter-range-list.component.scss']
})
export class ParameterRangeListComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();

  parameterRangePaginated$: Observable<any>;
  paginated$: Observable<any>;
  parameterRangePaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _parameterRangeService: ParameterRangeService,
  ){
    this.parameterRangePaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.parameterRangePaginated$ = this.parameterRangePaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = ParameterRangeHelper.columnsTable;
  }

  ngOnInit(): void {
    
  }
  
  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._parameterRangeService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.parameterRangePaginatedBehavior.next(paginated));
        }
      });
  }

  private abrirModal(parameterRange?: IParameterRange): void {

    const modalparameterRange = this._dialog.open(ParameterRangeModalComponent, {
      width: ConstantsGeneral.mdModal,
      disableClose: true,
      data: parameterRange
    });

    modalparameterRange.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  private delete(id:number): void{
    this._parameterRangeService
      .delete(id)
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
        this._dialog.closeAll();
      });
  }

  create(): void{
    this.abrirModal();
  }

  viewListParameter(id: string){
    const modalparameterValue = this._dialog.open(ParameterValueModalComponent, {
      width: ConstantsGeneral.lgModal,
      disableClose: true,
      data: id
    });

    modalparameterValue.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  update(parameterRange: IParameterRange): void{
    this.abrirModal(parameterRange);
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

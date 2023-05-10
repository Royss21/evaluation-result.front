import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { FormulaHelper } from '@modules/formula/helpers/formula.helper';
import { FormulaService } from '@core/services/formula/formula.service';
import { IFormula } from '@modules/formula/interfaces/formula.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { FormulaModalComponent } from '@modules/formula/components/formula-modal/formula-modal.component';

@Component({
  selector: 'app-formula-list',
  templateUrl: './formula-list.component.html',
  styleUrls: ['./formula-list.component.scss'],
})
export class FormulaListComponent {
  private unsubscribe$ = new Subject<any>();

  formulaPaginated$: Observable<any>;
  paginated$: Observable<any>;
  formulaPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _formulaService: FormulaService
  ) {
    this.formulaPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.formulaPaginated$ = this.formulaPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = FormulaHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$.subscribe((paginatedFilter: IPaginatedFilter) => {
      if (paginatedFilter) {
        this.paginatedFilterCurrent = paginatedFilter;
        this._formulaService
          .getPaginated(paginatedFilter)
          .subscribe((paginated) =>
            this.formulaPaginatedBehavior.next(paginated)
          );
      }
    });
  }

  private openModal(formula?: IFormula): void {
    const modalformula = this._dialog.open(FormulaModalComponent, {
      disableClose: true,
      data: formula,
    });

    modalformula.afterClosed().subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  private delete(id: string): void {
    this._formulaService.delete(id).subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
      this._dialog.closeAll();
    });
  }

  createFormula(): void {
    this.openModal();
  }

  updateFormula(formula: IFormula): void {
    this.openModal(formula);
  }

  confirmDeleted(id: string): void {
    const message = ConstantsGeneral.chooseDelete;

    this._formulaService.validAssigned(id).subscribe((isAssigned) => {
      if (isAssigned)
        message.text =
          'La fórmula está asignada a uno o mas Objetivos Corporativos \n' +
          '¿Estás seguro de eliminar el registro?';
    });

    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: message,
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

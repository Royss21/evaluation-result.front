import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { RoleService } from '@core/services/role/role.service';
import { IRole } from '@modules/role/interfaces/role.interface';
import { RoleHelper } from '@modules/role/helpers/role-helper.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { RoleModalComponent } from '@modules/role/components/role-modal/role-modal.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent {
  public title = RoleHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  rolePaginated$: Observable<any>;
  paginated$: Observable<any>;
  rolePaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(public _dialog: MatDialog, private _roleService: RoleService) {
    this.rolePaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.rolePaginated$ = this.rolePaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = RoleHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$.subscribe((paginatedFilter: IPaginatedFilter) => {
      if (paginatedFilter) {
        this.paginatedFilterCurrent = paginatedFilter;
        this._roleService
          .getPaginated(paginatedFilter)
          .subscribe((paginated) => this.rolePaginatedBehavior.next(paginated));
      }
    });
  }

  private openModal(role?: IRole): void {
    const modalRef = this._dialog.open(RoleModalComponent, {
      data: role,
      disableClose: true,
      width: ConstantsGeneral.mdModal,
    });

    modalRef.afterClosed().subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
    });
  }

  createRole(): void {
    this.openModal();
  }

  updateRole(role: IRole): void {
    this.openModal(role);
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

  private delete(id: number): void {
    this._roleService.delete(id).subscribe(() => {
      this.paginatedBehavior.next(this.paginatedFilterCurrent);
      this._dialog.closeAll();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

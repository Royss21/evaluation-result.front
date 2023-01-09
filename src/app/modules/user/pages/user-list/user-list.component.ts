import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ConstantsGeneral } from '@shared/constants';
import { UserService } from '@core/services/user/user.service';
import { IUser } from '@modules/user/interfaces/user.interface';
import { UserHelper } from '@modules/user/helpers/user-helper.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { PopupChooseComponent } from '@components/popup-choose/popup-choose.component';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { UserModalComponent } from '@modules/user/components/user-modal/user-modal.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  public title = UserHelper.titleActionText.list;
  private unsubscribe$ = new Subject<any>();

  userPaginated$: Observable<any>;
  paginated$: Observable<any>;
  userPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IPaginatedFilter;

  constructor(
    public _dialog: MatDialog,
    private _userService: UserService,
  ) {
    this.userPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.userPaginated$ = this.userPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = UserHelper.columnsTable;
  }

  ngAfterContentInit() {
    this.callPaginated();
  }

  private callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IPaginatedFilter) => {
        if(paginatedFilter){
          this.paginatedFilterCurrent = paginatedFilter;
          this._userService.getPaginated(paginatedFilter)
            .subscribe(paginated => this.userPaginatedBehavior.next(paginated));
        }
      });
  }

  private openModal(user?: IUser): void {
    const modalUser = this._dialog.open(UserModalComponent, {
      data: user,
      disableClose: true,
      width: ConstantsGeneral.xlModal
    });

    modalUser.afterClosed()
      .subscribe(() => {
        this.paginatedBehavior.next(this.paginatedFilterCurrent);
      });
  }

  createUser(): void{
    this.openModal();
  }

  updateUser(user: IUser): void{
    this.openModal(user);
  }

  confirmDeleted(id: string): void {
    const dialogRef = this._dialog.open(PopupChooseComponent, {
      data: ConstantsGeneral.chooseDelete,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.delete(id);
    });
  }

  private delete(id: string): void{
    this._userService
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MainBehaviorsService {
  private sidebarToggleBehavior: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  sidebarToggle$: Observable<any>;

  private menuBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  menu$: Observable<any>;

  private roleNameBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  roleName$: Observable<any>;

  private nameBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  name$: Observable<any>;

  constructor() {
    this.sidebarToggle$ = this.sidebarToggleBehavior.asObservable();
    this.menu$ = this.menuBehavior.asObservable();
    this.roleName$ = this.roleNameBehavior.asObservable();
    this.name$ = this.nameBehavior.asObservable();
  }

  emitSiderbarToggle() {
    this.sidebarToggleBehavior.next('');
  }

  emitMenu(menus: IMenu[]) {
    this.menuBehavior.next(menus);
  }

  emitRoleName(roleName: string) {
    this.roleNameBehavior.next(roleName);
  }

  emitName(name: string) {
    this.nameBehavior.next(name);
  }
}

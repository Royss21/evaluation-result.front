import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainBehaviorsService {

  private sidebarToggleBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  sidebarToggle$: Observable<any>;

  constructor() {
    this.sidebarToggle$ = this.sidebarToggleBehavior.asObservable();
  }

  emitSiderbarToggle(){
    this.sidebarToggleBehavior.next("");
  }
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { MainBehaviorsService } from './services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  private _routerSub: Subscription = new Subscription();
  private _sidebarToggleSub: Subscription = new Subscription();
  sideBarOpen = true;

  constructor(
    private _observer: BreakpointObserver,
    private _router: Router,
    private _mainBehaviorService: MainBehaviorsService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.listenSidebarToggle();
    this._observer.observe(['(max-width: 767px)']).subscribe((res) => {
      setTimeout(() => {
        if (res.matches) {
           this.sidenav.mode = 'over';
           this.sidenav.toggle();
           //this.sidenav.toggle();
           //  this.sidenav.close();
          // if (this.sideBarOpen) 
          this.sideBarOpen = false;
        } else {
          this.sidenav.mode = 'side';
          if (!this.sidenav.opened)
            this.sidenav.open();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._routerSub.unsubscribe();
    this._sidebarToggleSub.unsubscribe();
  }

  private listenSidebarToggle(){
    this._sidebarToggleSub = this._mainBehaviorService.sidebarToggle$
    .pipe(delay(10))
    .subscribe(() => {
      this.showHideSidebarToggle();
    })
  }

  private showHideSidebarToggle(){    
    if (this.sidenav.mode === 'over') {
      this.sidenav.toggle();
    }
    else 
      this.sideBarOpen = !this.sideBarOpen
  }

}

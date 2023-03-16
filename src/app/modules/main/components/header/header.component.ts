import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainBehaviorsService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName : string = '';

  constructor(
    private _router: Router,
    private _mainBehaviorService: MainBehaviorsService,
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name') || '';
  }

  toggleSideBar() {
    let sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("close");
    this._mainBehaviorService.emitSiderbarToggle();
  }

  logout(){
    localStorage.clear();
    this._router.navigateByUrl(`/auth`);
  }
}

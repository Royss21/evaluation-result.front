import { Component, OnInit } from '@angular/core';
import { MainBehaviorsService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _mainBehaviorService: MainBehaviorsService,
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this._mainBehaviorService.emitSiderbarToggle();
  }
}

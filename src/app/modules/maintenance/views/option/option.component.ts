import { Component, Input, OnInit } from '@angular/core';
import { IMenu } from '@modules/main/interfaces/menu.interface';

@Component({
  selector: 'app-options-maintenance',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  @Input() pathPage = '';
  @Input() icon = '';
  @Input() title = '';

  private _idMenu = 4;
  subMenus: any[] = [];

  ngOnInit(): void {
    const menus: IMenu[] = localStorage.getItem('menus')
      ? JSON.parse(localStorage.getItem('menus') || '')
      : [];
    this.subMenus = menus
      .filter((f) => f.menuDadId === this._idMenu)
      .map((m) => ({
        link: m.url,
        name: m.name,
      }));
  }
}

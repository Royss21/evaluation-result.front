import { Router } from '@angular/router';
import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { MainBehaviorsService } from '@modules/main/services';
import { IMenu } from '@modules/main/interfaces/menu.interface';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  visibleSidebar = true;
  responsivew = true;
  logingCollaborator = '';
  typeViewCollaborator = '';
  options: any[] = [];

  constructor(
    private _router: Router,
    private _mainBehaviorService: MainBehaviorsService
  ) {}

  ngOnInit() {
    this.logingCollaborator = localStorage.getItem('logingCollaborator') ?? '';
    this.typeViewCollaborator =
      localStorage.getItem('typeViewCollaborator') ?? '';

    if (this.logingCollaborator === '0') {
      const menus: IMenu[] = localStorage.getItem('menus')
        ? JSON.parse(localStorage.getItem('menus') || '')
        : [];
      const menusPrincipal = menus.filter((f) => f.menuDadId == null);
      this.options = menusPrincipal.map((m) => ({
        icon: m.icon,
        link: m.url,
        name: m.name,
        subCategories: menus
          .filter((f) => f.menuDadId == m.id)
          .map((c) => ({
            link: c.url,
            name: c.name,
          })),
      }));
    }
  }

  showSubMenu(e: any) {
    const arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle('showMenu');
    this._mainBehaviorService.emitSiderbarToggle();
  }

  goToPage(link: string, subCategories: any, index: any) {
    this._router.navigateByUrl(`/${link}`);
  }

  goToSubPage(linkFather: string, item: any) {
    this._router.navigateByUrl(`/${linkFather}/${item.link}`);
  }

  goToEvaluationDetail() {
    const evaluationId = localStorage.getItem('evaluationId');
    this._router.navigateByUrl(`/evaluation/${evaluationId}/detail`);
  }

  goToReviewEvaluation() {
    const evaluationId = localStorage.getItem('evaluationId');
    const collaboratorId = localStorage.getItem('collaboratorId');
    this._router.navigateByUrl(
      `/evaluation/${evaluationId}/collaborator/${collaboratorId}/review`
    );
  }

  closeSidebar(): void {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('close');
  }
}

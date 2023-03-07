import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainBehaviorsService } from '@modules/main/services';
import { IMenu } from '@modules/main/interfaces/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  visibleSidebar: boolean = true;
  responsivew:boolean = true ;
  getIndex:number = -1;
  logingCollaborator: string = '';
  typeViewCollaborator: string = '';
  options: any [] = [];

  constructor(
    private _router: Router,
    private _mainBehaviorService: MainBehaviorsService
    ) {}

  ngOnInit(){

    this.logingCollaborator = localStorage.getItem('logingCollaborator') ?? "";
    this.typeViewCollaborator = localStorage.getItem('typeViewCollaborator') ?? "";

    if(this.logingCollaborator ===  '0'){
      const menus: IMenu[] = localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus') ||  "") :  [];
      const menusPrincipal = menus.filter( f=> f.menuDadId == null);
      this.options = menusPrincipal.map(m => ({
          icon: m.icon,
          link: m.url,
          name: m.name,
          subCategories: menus.filter(f => f.menuDadId == m.id)
            .map(c => ({
              link:  c.url,
              name: c.name
            }))
      }));
    }
  }

  public toggleOption(index: number): void {
    if (this.getIndex === index) {
      let opt = document.querySelector('isActive');
      opt?.classList.toggle('show-card');
    }
  }

  goToPage(link: string, subCategories: any, index:any) {

    this.getIndex = index;
    this._router.navigateByUrl(link);
  }

  goToSubPage(linkFather: string, item: any) {
    this._router.navigateByUrl(`${linkFather}/${item.link}`);
  }

  goToEvaluationDetail(){
    const evaluationId = localStorage.getItem('evaluationId');
    this._router.navigateByUrl(`/evaluation/${evaluationId}/detail`);
  }

  goToReviewEvaluation(){
    const evaluationId = localStorage.getItem('evaluationId');
    const collaboratorId = localStorage.getItem('collaboratorId');
    this._router.navigateByUrl(`/evaluation/${evaluationId}/collaborator/${ collaboratorId}/review`);
  }
}

import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  visibleSidebar: boolean = true;
  responsivew:boolean = true ;
  getIndex:number = -1;

  constructor(private _router: Router) {}

  public options = [
    {
      icon: 'calendar_today',
      link: 'period',
      name: 'Periodo',
      subCategories: []
    },
    {
      icon: 'pinch',
      link: 'evaluation',
      name: 'Evaluación',
      subCategories: []
    },
    {
      icon: 'settings',
      link: 'configuration',
      name: 'Configuración',
      subCategories: [
        {
          link: 'level',
          name: 'Nivel'
        },
        {
          link: 'formula',
          name: 'Formula'
        },
        {
          link: 'parameter-range',
          name: 'Rango Parámetros'
        },
        {
          link: 'corporate-objectives',
          name: 'Objetivos Corporativos'
        },
        {
          link: 'area-objectives',
          name: 'Objetivos Área'
        },
        {
          link: 'competences',
          name: 'Competencias'
        },
        {
          link: 'weight-per-component',
          name: 'Pesos por Jerarquía'
        },
      ]
    },
    {
      icon: 'edit_square',
      link: 'maintenance',
      name: 'Mantenimiento',
      subCategories: [
        {
          link: 'collaborator',
          name: 'Colaboradores'
        },
        {
          link: 'gerency',
          name: 'Gerencias'
        },
        {
          link: 'hierarchy',
          name: 'Jerarquías'
        },
        {
          link: 'area',
          name: 'Áreas'
        },
        {
          link: 'charge',
          name: 'Cargos'
        },
        {
          link: 'user',
          name: 'Usuarios'
        },
        {
          link: 'role',
          name: 'Roles'
        },
      ]
    },
    {
      icon: 'lock',
      link: 'security',
      name: 'Seguridad',
      subCategories: [
        {
          link: 'audit',
          name: 'Auditoría'
        },
        {
          link: 'logs-system',
          name: 'Logs'
        }
      ]
    },
    {
      icon: 'equalizer',
      link: 'report',
      name: 'Reportes',
      subCategories: [
        {
          link: 'grade',
          name: 'Reporte 1'
        },
        {
          link: 'grade',
          name: 'Reporte 2'
        }
      ]
    }
  ]

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
}

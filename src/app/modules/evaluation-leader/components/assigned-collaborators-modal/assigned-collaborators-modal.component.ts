import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaderService } from '@core/services/evaluation-leader/leader.service';
import { LeaderHelper } from '@modules/evaluation-leader/helpers/leader.helper';
import { ILeaderCollaboratorFilter } from '@modules/evaluation-leader/interfaces/leader-collaborador-filter.interface';
import { ILeaderCollaborator } from '@modules/evaluation-leader/interfaces/leader-collaborador.interface';

@Component({
  selector: 'app-assigned-collaborators-modal',
  templateUrl: './assigned-collaborators-modal.component.html',
  styleUrls: ['./assigned-collaborators-modal.component.scss']
})
export class AssignedCollaboratorsModalComponent implements OnInit, AfterViewInit {
  //AUN FALTA CULMINAR EL LISTADO Y HACER PRUEBAS

  @ViewChildren("elementObserver", { read: ElementRef }) elementObserver: QueryList<ElementRef>;

  private filterCurrent: ILeaderCollaboratorFilter;
  private observer: any;
  private countCurrent:number = 0;
  countTotal:number = 0;
  collaborators: ILeaderCollaborator[] = [];
  textSearch: string = '';

  constructor(
    private _leaderService: LeaderService,
    private _modalRef: MatDialogRef<AssignedCollaboratorsModalComponent>,
  ) {
    this.filterCurrent= LeaderHelper.initialFilter;
  }

  ngOnInit(): void {
    this.getCollaborators();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.elementObserver.changes.subscribe(e => {
      if(e.last)
        this.observer.observe(e.last.nativeElement);
    });
  }

  closeModal(): void {
    this._modalRef.close();
  }

  getCollaborators(): void {
    this._leaderService.getCollaboratorsByLeader(1, this.filterCurrent)
      .subscribe(({ countTotal, collaborators }) =>{
        this.countCurrent += collaborators.length;
        this.countTotal = countTotal;
        this.collaborators = [...this.collaborators, ...collaborators];
      })
  }

  searchCollaborator(){
    this.filterCurrent = { ...LeaderHelper.initialFilter, globalFilter: this.textSearch};
    this.getCollaborators();
  }

  intersectionObserver() : void{
    const options= {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    this.observer = new IntersectionObserver((entries) => {

      if(entries[0].isIntersecting){        
        if(this.countCurrent < this.countTotal ){
          this.filterCurrent.pageIndex += 1;
          this.getCollaborators();
        }
      }

    }, options);
  }
}

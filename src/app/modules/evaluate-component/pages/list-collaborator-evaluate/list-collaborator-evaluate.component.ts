import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IPaginatedFilter } from '@components/table/interfaces/paginated-filter.interface';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import { EvaluationCollaboratorService } from '@core/services/evaluation-collaborator/evaluation-collaborator.service';
import { EvaluateComponentHelper, EvaluateComponentText } from '@modules/evaluate-component/helpers/evaluate-component.helper';
import { IComponentCollaboratorFilter } from '@modules/evaluate-component/interfaces/evaluation-collaborator-evaluate-filter.interface';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-collaborator-evaluate',
  templateUrl: './list-collaborator-evaluate.component.html',
  styleUrls: ['./list-collaborator-evaluate.component.scss']
})
export class ListCollaboratorEvaluateComponent implements OnInit {

  private unsubscribe$ = new Subject<any>();
  private _evaluationId: string = '';
  private _componentId: number;

  title: string = '';
  status: any;
  evaluateComponentPaginated$: Observable<any>;
  paginated$: Observable<any>;
  evaluateComponentPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IComponentCollaboratorFilter;

  constructor(
    public _dialog: MatDialog,
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _route: ActivatedRoute
  ){
    this.evaluateComponentPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.evaluateComponentPaginated$ = this.evaluateComponentPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = EvaluateComponentHelper.columnsTable;
    this.status = ConstantsGeneral.status;
  }
  ngOnInit(): void {
    
    this._route.params.subscribe(params => {
      this._componentId = params['componentId'];
      this._evaluationId = params['evaluationId'];

      this.title = this._componentId === ConstantsGeneral.components.corporateObjectives  
          ? EvaluateComponentText.titleCorporateObjectives
          : this._componentId === ConstantsGeneral.components.areaObjectives
            ?  EvaluateComponentText.titleAreaObjectives
            : EvaluateComponentText.titleCompetencies;
    });
  }
  
  ngAfterContentInit() {
    this._callPaginated();
  }

  private _callPaginated(): void {
    this.paginated$
      .subscribe((paginatedFilter: IComponentCollaboratorFilter) => {
        if(paginatedFilter){

          this.paginatedFilterCurrent =  {
            ...paginatedFilter,
            evaluationId: this._evaluationId,
            componentId: this._componentId,
          }

          this._componentCollaboratorService.getPaginated(this.paginatedFilterCurrent)
              .subscribe(paginated => this.evaluateComponentPaginatedBehavior.next(paginated));
        }  
      });
  }

  evaluate(){
    if(this._componentId == ConstantsGeneral.components.corporateObjectives)
      console.log('acaa');
    else if(this._componentId == ConstantsGeneral.components.areaObjectives)
      console.log('acaa');
    else if(this._componentId == ConstantsGeneral.components.competencies)
      console.log('acaa');
  } 

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IElementRowTable } from '@components/table/interfaces/table.interface';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';
import {
  EvaluateComponentHelper,
  EvaluateComponentText,
} from '@modules/evaluate-component/helpers/evaluate-component.helper';
import { IComponentCollaboratorFilter } from '@modules/evaluate-component/interfaces/component-collaborator-filter.interface';
import { IComponentCollaboratorPaged } from '@modules/evaluate-component/interfaces/component-collaborator-paged.interface';
import { ConstantsGeneral } from '@shared/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list-collaborator-evaluate',
  templateUrl: './list-collaborator-evaluate.component.html',
  styleUrls: ['./list-collaborator-evaluate.component.scss'],
})
export class ListCollaboratorEvaluateComponent implements OnInit {
  private unsubscribe$ = new Subject<any>();
  private _evaluationId = '';
  private _componentId: number;

  title = '';
  status: any;
  evaluateComponentPaginated$: Observable<any>;
  paginated$: Observable<any>;
  evaluateComponentPaginatedBehavior: BehaviorSubject<any>;
  paginatedBehavior: BehaviorSubject<any>;
  columnsTable: IElementRowTable[];
  paginatedFilterCurrent: IComponentCollaboratorFilter;

  constructor(
    private _componentCollaboratorService: ComponentCollaboratorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.evaluateComponentPaginatedBehavior = new BehaviorSubject(null);
    this.paginatedBehavior = new BehaviorSubject(null);
    this.evaluateComponentPaginated$ =
      this.evaluateComponentPaginatedBehavior.asObservable();
    this.paginated$ = this.paginatedBehavior.asObservable();
    this.columnsTable = EvaluateComponentHelper.columnsTable;
  }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._componentId = params['componentId'];
      this._evaluationId = params['evaluationId'];

      this.title =
        this._componentId == ConstantsGeneral.components.corporateObjectives
          ? EvaluateComponentText.titleCorporateObjectives
          : this._componentId == ConstantsGeneral.components.areaObjectives
          ? EvaluateComponentText.titleAreaObjectives
          : EvaluateComponentText.titleCompetencies;
    });
  }

  ngAfterContentInit() {
    this._callPaginated();
  }

  private _callPaginated(): void {
    this.paginated$.subscribe(
      (paginatedFilter: IComponentCollaboratorFilter) => {
        if (paginatedFilter) {
          this.paginatedFilterCurrent = {
            ...paginatedFilter,
            evaluationId: this._evaluationId,
            componentId: this._componentId,
            evaluationCollaboratorId:
              localStorage.getItem('collaboratorId') || '',
          };

          this._componentCollaboratorService
            .getPaginated(this.paginatedFilterCurrent)
            .subscribe((paginated) =>
              this.evaluateComponentPaginatedBehavior.next(paginated)
            );
        }
      }
    );
  }

  evaluate(componentCollaborator: IComponentCollaboratorPaged) {
    let routeChild = '';

    if (this._componentId == ConstantsGeneral.components.corporateObjectives)
      routeChild = 'corporate-objectives';
    else if (this._componentId == ConstantsGeneral.components.areaObjectives)
      routeChild = 'area-objectives';
    else if (this._componentId == ConstantsGeneral.components.competencies)
      routeChild = 'competencies';

    this._router.navigateByUrl(
      `${this._router.url}/${routeChild}/${componentCollaborator.id}`
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}

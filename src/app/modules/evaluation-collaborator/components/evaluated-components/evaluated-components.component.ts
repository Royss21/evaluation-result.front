import { Component, Input, OnInit } from '@angular/core';
import { IResultComponentCollaborator } from '@modules/evaluation-collaborator/interfaces/result-evaluation-collaborator.interfaces';
import { ConstantsGeneral } from '@shared/constants';

@Component({
  selector: 'app-evaluated-components',
  templateUrl: './evaluated-components.component.html',
  styleUrls: ['./evaluated-components.component.scss'],
})
export class EvaluatedComponentsComponent implements OnInit {
  @Input() resultComponents: IResultComponentCollaborator[] = [];

  constructor() {}

  get resultCorporateObjectives(): IResultComponentCollaborator | null {
    return (
      this.resultComponents.find(
        (f) => f.componentId === ConstantsGeneral.components.corporateObjectives
      ) || null
    );
  }

  get resultAreaObjectives(): IResultComponentCollaborator | null {
    return (
      this.resultComponents.find(
        (f) => f.componentId === ConstantsGeneral.components.areaObjectives
      ) || null
    );
  }

  get resultCompetencies(): IResultComponentCollaborator | null {
    return (
      this.resultComponents.find(
        (f) => f.componentId === ConstantsGeneral.components.competencies
      ) || null
    );
  }

  ngOnInit(): void {}
}

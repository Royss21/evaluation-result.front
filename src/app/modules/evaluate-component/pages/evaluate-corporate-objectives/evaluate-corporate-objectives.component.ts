import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCollaboratorService } from '@core/services/component-collaborator/component-collaborator.service';

@Component({
  selector: 'app-evaluate-corporate-objectives',
  templateUrl: './evaluate-corporate-objectives.component.html',
  styleUrls: ['./evaluate-corporate-objectives.component.scss']
})
export class EvaluateCorporateObjectivesComponent implements OnInit {

  private _componentCollaboratorId: string;

  constructor(
    private _route: ActivatedRoute,
    private _componentCollaboratorService: ComponentCollaboratorService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._componentCollaboratorId = params['componentCollaboratorId'];
      this._getEvaluationData();
    });
  }

  private _getEvaluationData(){
    this._componentCollaboratorService.getEvaluationData(this._componentCollaboratorId)
      .subscribe(data => {
        console.log(data)
      });
  }

}

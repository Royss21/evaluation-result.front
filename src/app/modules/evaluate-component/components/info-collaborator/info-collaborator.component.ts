import { Component, Input, OnInit } from '@angular/core';
import { ICollaboratorInformation } from '@modules/evaluate-component/interfaces/collaborator-information.interface';

@Component({
  selector: 'app-info-collaborator',
  templateUrl: './info-collaborator.component.html',
  styleUrls: ['./info-collaborator.component.scss']
})
export class InfoCollaboratorComponent implements OnInit {

  @Input() infoCollaborator: ICollaboratorInformation

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input } from '@angular/core';
import { ICollaboratorInformation } from '@core/interfaces/collaborator-information.interface';

@Component({
  selector: 'app-info-collaborator',
  templateUrl: './info-collaborator.component.html',
  styleUrls: ['./info-collaborator.component.scss'],
})
export class InfoCollaboratorComponent {
  @Input() infoCollaborator: ICollaboratorInformation | null = null;
}

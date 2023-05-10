import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss'],
})
export class ComponentItemComponent {
  @Input() icon: string;
  @Input() componentName: string;
  @Input() isCreatedInEvaluation: boolean;
}

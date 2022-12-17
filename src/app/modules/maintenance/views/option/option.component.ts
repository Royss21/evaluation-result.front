import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-options-maintenance',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {

  @Input() pathPage: string = '';
  @Input() icon: string = '';
  @Input() title: string = '';

}

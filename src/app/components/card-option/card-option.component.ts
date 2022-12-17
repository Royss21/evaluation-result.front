import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-option',
  templateUrl: './card-option.component.html',
  styleUrls: ['./card-option.component.scss']
})

export class CardOptionComponent {

  @Input() pathPage: string = '';
  @Input() icon: string = '';
  @Input() title: string = '';

}

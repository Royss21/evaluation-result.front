import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss']
})
export class ComponentItemComponent implements OnInit {

  @Input() icon: string;
  @Input() componentName: string;
  @Input() isCreatedInEvaluation: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

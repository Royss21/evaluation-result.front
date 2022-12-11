import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resume-component',
  templateUrl: './resume-component.component.html',
  styleUrls: ['./resume-component.component.scss']
})
export class ResumeComponentComponent {

  @Input() public title: string;
  @Input() public dateStart: string;
  @Input() public dateEnd: string;
  @Input() public imageSRC: string;

}

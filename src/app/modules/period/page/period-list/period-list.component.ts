import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent {

  constructor(
    private router: Router
  ){}

  public goToNewPeriod(): void {
    this.router.navigate(['/period/edit']).then(() => {});
  }

}

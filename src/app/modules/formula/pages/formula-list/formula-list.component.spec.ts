import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaListComponent } from './formula-list.component';

describe('FormulaListComponent', () => {
  let component: FormulaListComponent;
  let fixture: ComponentFixture<FormulaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

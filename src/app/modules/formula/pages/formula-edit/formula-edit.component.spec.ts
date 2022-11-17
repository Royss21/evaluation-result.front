import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaEditComponent } from './formula-edit.component';

describe('FormulaEditComponent', () => {
  let component: FormulaEditComponent;
  let fixture: ComponentFixture<FormulaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

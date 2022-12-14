import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductItemComponent } from './conduct-item.component';

describe('ConductItemComponent', () => {
  let component: ConductItemComponent;
  let fixture: ComponentFixture<ConductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConductItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderImportModalComponent } from './leader-import-modal.component';

describe('LeaderImportModalComponent', () => {
  let component: LeaderImportModalComponent;
  let fixture: ComponentFixture<LeaderImportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderImportModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

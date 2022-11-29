import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCollaboratorsModalComponent } from './assigned-collaborators-modal.component';

describe('AssignedCollaboratorsModalComponent', () => {
  let component: AssignedCollaboratorsModalComponent;
  let fixture: ComponentFixture<AssignedCollaboratorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedCollaboratorsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCollaboratorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

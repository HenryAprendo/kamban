import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewTaskAndUpdateProgressComponent } from './dialog-view-task-and-update-progress.component';

describe('DialogViewTaskAndUpdateProgressComponent', () => {
  let component: DialogViewTaskAndUpdateProgressComponent;
  let fixture: ComponentFixture<DialogViewTaskAndUpdateProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogViewTaskAndUpdateProgressComponent]
    });
    fixture = TestBed.createComponent(DialogViewTaskAndUpdateProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

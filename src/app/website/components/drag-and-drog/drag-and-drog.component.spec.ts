import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDrogComponent } from './drag-and-drog.component';

describe('DragAndDrogComponent', () => {
  let component: DragAndDrogComponent;
  let fixture: ComponentFixture<DragAndDrogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragAndDrogComponent]
    });
    fixture = TestBed.createComponent(DragAndDrogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

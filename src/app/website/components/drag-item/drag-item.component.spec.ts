import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragItemComponent } from './drag-item.component';

describe('DragItemComponent', () => {
  let component: DragItemComponent;
  let fixture: ComponentFixture<DragItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragItemComponent]
    });
    fixture = TestBed.createComponent(DragItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

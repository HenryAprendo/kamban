import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInputDataComponent } from './dialog-input-data.component';

describe('DialogInputDataComponent', () => {
  let component: DialogInputDataComponent;
  let fixture: ComponentFixture<DialogInputDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogInputDataComponent]
    });
    fixture = TestBed.createComponent(DialogInputDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

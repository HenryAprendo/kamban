import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDragComponent } from './card-drag.component';

describe('CardDragComponent', () => {
  let component: CardDragComponent;
  let fixture: ComponentFixture<CardDragComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardDragComponent]
    });
    fixture = TestBed.createComponent(CardDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

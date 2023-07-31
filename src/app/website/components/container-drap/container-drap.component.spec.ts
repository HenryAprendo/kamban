import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDrapComponent } from './container-drap.component';

describe('ContainerDrapDropComponent', () => {
  let component: ContainerDrapComponent;
  let fixture: ComponentFixture<ContainerDrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContainerDrapComponent]
    });
    fixture = TestBed.createComponent(ContainerDrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

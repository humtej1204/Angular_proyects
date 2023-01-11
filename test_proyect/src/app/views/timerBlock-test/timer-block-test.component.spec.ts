import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerBlockTestComponent } from './timer-block-test.component';

describe('TimerBlockTestComponent', () => {
  let component: TimerBlockTestComponent;
  let fixture: ComponentFixture<TimerBlockTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerBlockTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerBlockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

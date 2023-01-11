import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcomponentTestComponent } from './subcomponent-test.component';

describe('SubcomponentTestComponent', () => {
  let component: SubcomponentTestComponent;
  let fixture: ComponentFixture<SubcomponentTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcomponentTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcomponentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

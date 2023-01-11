import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNitComponent } from './crear-nit.component';

describe('CrearNitComponent', () => {
  let component: CrearNitComponent;
  let fixture: ComponentFixture<CrearNitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

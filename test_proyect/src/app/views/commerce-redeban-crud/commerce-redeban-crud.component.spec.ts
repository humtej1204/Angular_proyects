import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceRedebanCrudComponent } from './commerce-redeban-crud.component';

describe('CommerceRedebanCrudComponent', () => {
  let component: CommerceRedebanCrudComponent;
  let fixture: ComponentFixture<CommerceRedebanCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommerceRedebanCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommerceRedebanCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

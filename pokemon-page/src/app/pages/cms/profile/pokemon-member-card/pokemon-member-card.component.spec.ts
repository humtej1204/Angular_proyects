import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMemberCardComponent } from './pokemon-member-card.component';

describe('PokemonMemberCardComponent', () => {
  let component: PokemonMemberCardComponent;
  let fixture: ComponentFixture<PokemonMemberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonMemberCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

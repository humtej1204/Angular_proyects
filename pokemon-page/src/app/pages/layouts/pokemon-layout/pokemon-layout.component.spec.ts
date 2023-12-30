import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonLayoutComponent } from './pokemon-layout.component';

describe('PokemonLayoutComponent', () => {
  let component: PokemonLayoutComponent;
  let fixture: ComponentFixture<PokemonLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from './home/home.component';

/* Angular Materials */
import { MaterialExampleModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { PokemonListComponent } from './home/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './home/pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialExampleModule,
    RouterModule,
  ]
})
export class Page01Module { }

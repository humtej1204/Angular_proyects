import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/* Components */
import { PokemonLayoutComponent } from './layouts/pokemon-layout/pokemon-layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FormTemplateComponent } from './cms/form-template/form-template.component';
import { PokemonCardComponent } from './cms/home/pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './cms/home/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './cms/pokemon/pokemon.component';
import { ProfileComponent } from './cms/profile/profile.component';
import { HomeComponent } from './cms/home/home.component';

/* Angular Materials */
import { MaterialExampleModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FormTemplateComponent,
    PokemonLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialExampleModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class Page01Module { }

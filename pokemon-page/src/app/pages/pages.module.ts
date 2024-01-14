import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

/* Components */
import { PokemonLayoutComponent } from './layouts/pokemon-layout/pokemon-layout.component';
import { PokemonCardComponent } from './cms/home/pokemon-list/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './cms/home/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './cms/pokemon/pokemon.component';
import { ProfileComponent } from './cms/profile/profile.component';
import { HomeComponent } from './cms/home/home.component';
import { PokemonMemberCardComponent } from './cms/profile/pokemon-member-card/pokemon-member-card.component';

/* Angular Materials */
import { MaterialModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ComponentsModule } from '../components/components.module';
import { InputErrorMessageDirective } from '../directives/input-error-message/input-error-message.directive';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PokemonLayoutComponent,
    PokemonMemberCardComponent,
    InputErrorMessageDirective
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }

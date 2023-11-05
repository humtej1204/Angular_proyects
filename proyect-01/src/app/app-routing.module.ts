import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UnloggedGuard } from './guards/unlogged.guard';
import { ExitGuard } from './guards/exit.guard';

import { PokemonLayoutComponent } from './pages/layouts/pokemon-layout/pokemon-layout.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { FormTemplateComponent } from './pages/cms/form-template/form-template.component';
import { HomeComponent } from './pages/cms/home/home.component';
import { PokemonComponent } from './pages/cms/pokemon/pokemon.component';
import { ProfileComponent } from './pages/cms/profile/profile.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnloggedGuard],
    canDeactivate: [ExitGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnloggedGuard],
  },
  {
    path: 'user',
    component: PokemonLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'pokemones',
        component: HomeComponent,
      },
      {
        path: 'pokemon/:pokeId',
        component: PokemonComponent,
      },
      {
        path: 'form-test',
        component: FormTemplateComponent,
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'profile'
      },
    ]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

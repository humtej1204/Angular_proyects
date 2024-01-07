import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, BehaviorSubject } from 'rxjs';

import { Auth } from '../../models/auth.model';
import { IUserProfile, User } from '../../models/user.model';

import { TokenService } from './token.service';

import { checkToken } from '../../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  private profile = new BehaviorSubject<IUserProfile | null>(null);
  myProfile$ = this.profile.asObservable();

  login(email: string, password: string) {
    return this.http.post<Auth>(this.apiUrl + '/login', {email, password})
    .pipe(
      tap(res => this.tokenService.saveToken(res.access_token))
    )
  }

  getProfile() {
    return this.http.get<User>(this.apiUrl + '/profile',
      { context: checkToken() }).pipe(
        tap(res => {
          const profileData: IUserProfile = {
            ...res,
            avatar: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/cbaa5742-ee2a-4be9-914f-3f1ffb035f29/width=450/00009.jpeg',
            age: 18,
            birthday: new Date("1999-04-12T00:00:00"),
            region: 'Kanto',
            hometown: 'Pueblo Paleta',
            class: 'Entrenador',
            range: 'Plata',
            level: 16,
            exp: '3574',
            pokemonsCatched: 113,
            pokemonTeam: [5, 25, 125, 50, 500, 250]
          }
          this.profile.next(profileData)
        })
      )
  }

  logout() {
    this.tokenService.removeToken();
  }

}

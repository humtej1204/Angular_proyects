import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, BehaviorSubject } from 'rxjs';

import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

import { TokenService } from './token.service';

import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  private profile = new BehaviorSubject<User | null>(null);
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
        tap(res => this.profile.next(res))
      )
  }

  logout() {
    this.tokenService.removeToken();
  }

}

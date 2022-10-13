import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(
    private http: HttpClient,
  ) { }

  create(dto: UserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}

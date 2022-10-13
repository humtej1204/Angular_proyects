import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { Auth } from '../../models/auth.model';
import { User } from '../../models/user.model';

import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  hide = true;
  user = {
    email: 'haru1204@gmail.com',
    password: '123456',
  };

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user.email, this.user.password)
      .pipe(
        switchMap((res: Auth) => {
          console.log(res.access_token);

          return this.authService.getProfile();
        })
      ).subscribe((profile: User) => {
        console.log(profile);
      });
  }

}

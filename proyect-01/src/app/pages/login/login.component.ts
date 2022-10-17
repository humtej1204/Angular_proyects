import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  hide = true;

  ngOnInit(): void {
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  sendData(event: Event) {
    if (this.loginForm.invalid) {
      console.log('Please fill the Form');
      return;
    }

    this.login(this.loginForm.value)
  }

  login(data: any) {
    this.authService.login(data.email, data.password)
      .pipe(
        switchMap((res: Auth) => {
          console.log(res.access_token);

          return this.authService.getProfile();
        })
      ).subscribe((profile: User) => {
        console.log(profile);
        this.router.navigateByUrl('profile')
      });
  }

}

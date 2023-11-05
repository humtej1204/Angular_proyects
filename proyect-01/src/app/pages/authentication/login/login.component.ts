import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    ).subscribe({
      next: (profile: User) => {
        console.log(profile);
        this.router.navigateByUrl('/user/profile')
      }, error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}

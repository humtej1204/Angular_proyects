import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, switchMap, take } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/ui-services/snackbar/snackbar.service';

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
    private formBuilder: FormBuilder,
    private snackbarServ: SnackbarService
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
      this.snackbarServ.openSnackbar('Ingrese los datos para continuar', 'error');
      return;
    }

    this.login(this.loginForm.value)
  }

  login(data: any) {
    this.authService.login(data.email, data.password)
    .pipe(
      switchMap((res: Auth) => this.authService.getProfile())
    ).subscribe({
      next: (profile: User) => {
        this.router.navigateByUrl('/user/profile')
      }, error: (error: HttpErrorResponse) => {
        this.snackbarServ.openSnackbar(`Error code ${error.status}: ${error.error.message}`, 'error');
        console.error(error);
      }
    })
  }
}

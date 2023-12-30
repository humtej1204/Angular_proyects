import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { OnExit } from 'src/app/guards/exit.guard';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {

  registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  hide01 = true;
  hide02 = true;

  ngOnInit(): void {
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)]]
    });
  }
  confirmPass: FormControl = new FormControl('', Validators.required);

  saveData(event: Event) {
    if (this.registerForm.invalid) {
      console.log('Please fill the Form');
      return;
    }

    if (this.confirmPass.value !== this.registerForm.get('password')?.value) {
      console.log('Confirm Passwords are same');
      return;
    }
    this.createUser(this.registerForm.value)
  }

  onExit() {
    if (this.registerForm.invalid && this.registerForm.touched) {
      const rta = confirm('El formulario no esta correctamente lleno.\nSi sale los cambios no seran guardados');
      return rta;
    }

    return true;
  };

  createUser(data: any) {
    this.userService.create(data)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('login');
      });
  }

}

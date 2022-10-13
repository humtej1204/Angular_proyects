import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { OnExit } from 'src/app/guards/exit.guard';

import { UserDTO } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  hide = true;

  newUser: UserDTO = {
    email: 'haru1204@hmail.com',
    password: '123456',
    name: 'harumonster',
  };

  ngOnInit(): void {
  }

  onExit() {
    const rta = confirm('Seguro que deseas salir?');
    return rta;
  };

  createUser() {
    this.userService.create(this.newUser)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('login');
      });
  }

}

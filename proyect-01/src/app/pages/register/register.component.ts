import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { UserDTO } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  hide = true;

  newUser: UserDTO = {
    email: 'haru1204@gmail.com',
    password: '123456',
    name: 'harumon',
  };

  ngOnInit(): void {
  }

  createUser() {
    this.userService.create(this.newUser)
      .subscribe(res => {
        console.log(res);
      });
  }

}

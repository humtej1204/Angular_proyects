import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

import { IUserProfile } from 'src/app/models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  user: IUserProfile | null = null;

  ngOnInit(): void {
    this.authService.myProfile$
    .subscribe(data => {
      this.user = data;
    });
  }

}

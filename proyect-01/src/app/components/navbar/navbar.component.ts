import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  user: User | null = null;

  ngOnInit(): void {
    this.authService.myProfile$.subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('home')
  }
}

import { Component, OnInit,
  ElementRef, HostListener
} from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private elemRef: ElementRef
  ) {}

  user: User | null = null;

  ngOnInit(): void {
    this.authService.myProfile$.subscribe(data => {
      this.user = data;
    });
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.openMenu) {
      const menuElement = this.elemRef.nativeElement.querySelector('.menu_cont');
      const buttonElement = this.elemRef.nativeElement.querySelector('.menu_btn');

      if (!menuElement.contains(event.target) && !buttonElement.contains(event.target)) {
        this.closeMenuProfile();
      }
    }
  }

  openMenuProfile() {
    this.openMenu = !this.openMenu;
  }

  closeMenuProfile() {
    this.openMenu = false;
  }

  goProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('home')
  }
}

import { Component } from '@angular/core';

import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokemon-page';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }
}

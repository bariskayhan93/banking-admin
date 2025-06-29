import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  private auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' }
    });
  }
}

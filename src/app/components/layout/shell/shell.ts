import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell {
  private auth = inject(AuthService);
  protected showLogoutConfirm = signal(false);
  
  protected userProfile$ = this.auth.user$.pipe(
    map(user => ({
      name: user?.name || '',
      email: user?.email || '',
      picture: user?.picture || '',
      role: 'admin' as const
    }))
  );
  
  protected confirmLogout(): void {
    this.showLogoutConfirm.set(true);
  }
  
  protected logout(): void {
    this.showLogoutConfirm.set(false);
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
  
  protected cancelLogout(): void {
    this.showLogoutConfirm.set(false);
  }
}

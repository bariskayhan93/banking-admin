import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgbOffcanvasModule],
  templateUrl: './shell.html',
  styleUrl: './shell.scss'
})
export class Shell {
  private auth = inject(AuthService);
  private offcanvas = inject(NgbOffcanvas);
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
  
  protected toggleMobileNav(): void {
    import('./mobile-nav/mobile-nav').then(({ MobileNavComponent }) => {
      this.offcanvas.open(MobileNavComponent, { position: 'start' });
    });
  }
}

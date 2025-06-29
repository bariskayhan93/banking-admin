import { Injectable, inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private auth0 = inject(Auth0Service);

  readonly isAuthenticated$ = this.auth0.isAuthenticated$.pipe(
    catchError(() => of(false))
  );

  readonly user$ = this.auth0.user$.pipe(
    catchError(() => of(null))
  );

  readonly isLoading$ = this.auth0.isLoading$;
  
  readonly userProfile$ = this.user$.pipe(
    map(user => ({
      name: user?.name || '',
      email: user?.email || '',
      picture: user?.picture || '',
      role: 'admin' as const
    }))
  );

  login(targetUrl?: string): void {
    this.auth0.loginWithRedirect({
      appState: targetUrl ? { target: targetUrl } : undefined
    });
  }

  logout(): void {
    if (!confirm('Are you sure you want to logout?')) return;
    
    this.clearStorage();
    this.auth0.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }

  getAccessToken$ = () => this.auth0.getAccessTokenSilently().pipe(
    catchError(error => {
      if (error.error === 'login_required') this.login();
      throw error;
    })
  );

  private clearStorage(): void {
    const preserve = ['theme', 'language'];
    Object.keys(localStorage).forEach(key => {
      if (!preserve.includes(key)) localStorage.removeItem(key);
    });
  }
}

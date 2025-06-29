import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Shell } from './components/layout/shell/shell';
import { AsyncPipe } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Shell, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private auth = inject(AuthService);
  private hasError = signal(false);

  protected isLoading$ = this.auth.isLoading$;
  
  protected isAuthenticated$ = this.auth.isAuthenticated$.pipe(
    catchError(() => {
      this.hasError.set(true);
      return of(false);
    })
  );

  protected authError$ = this.hasError.asReadonly();

  protected login(): void {
    this.hasError.set(false);
    this.auth.loginWithRedirect({
      appState: { target: this.getIntendedRoute() }
    });
  }

  protected retryAuth(): void {
    this.hasError.set(false);
    window.location.reload();
  }

  private getIntendedRoute(): string {
    const path = window.location.pathname;
    return path === '/auth/callback' ? '/dashboard' : path;
  }
}

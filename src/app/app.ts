import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shell } from './components/layout/shell/shell';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Shell, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private auth = inject(AuthService);

  protected authState$ = combineLatest([
    this.auth.isLoading$.pipe(startWith(true)),
    this.auth.isAuthenticated$.pipe(startWith(false)),
    this.auth.error$.pipe(startWith(null))
  ]).pipe(
    map(([isLoading, isAuthenticated, error]) => ({
      isLoading,
      isAuthenticated,
      error
    }))
  );

  protected login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' }
    });
  }

  protected retryAuth(): void {
    window.location.reload();
  }
}

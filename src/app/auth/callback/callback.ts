import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { filter, take, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.scss'
})
export class Callback implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected hasError = signal(false);

  ngOnInit(): void {
    this.auth.isLoading$.pipe(
      filter(loading => !loading),
      take(1),
      switchMap(() => this.auth.isAuthenticated$),
      take(1),
      catchError(() => {
        this.hasError.set(true);
        return of(false);
      })
    ).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.auth.appState$.pipe(take(1)).subscribe(appState => {
          this.router.navigate([appState?.target || '/dashboard']);
        });
      } else {
        this.hasError.set(true);
      }
    });
  }

  protected retryAuth(): void {
    window.location.href = '/';
  }
}

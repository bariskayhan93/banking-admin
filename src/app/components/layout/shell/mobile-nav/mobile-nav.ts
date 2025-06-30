import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-nav',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title fw-bold text-primary mb-0">Banking Admin</h5>
      <button type="button" class="btn-close" (click)="close()"></button>
    </div>
    <div class="offcanvas-body p-0 d-flex flex-column">
      <nav class="nav flex-column p-3 flex-grow-1">
        <a class="nav-link" routerLink="/dashboard" routerLinkActive="active" (click)="close()">
          <i class="bi bi-speedometer2 me-2"></i>Dashboard
        </a>
        <a class="nav-link" routerLink="/persons" routerLinkActive="active" (click)="close()">
          <i class="bi bi-people me-2"></i>Personen
        </a>
        <a class="nav-link" routerLink="/accounts" routerLinkActive="active" (click)="close()">
          <i class="bi bi-bank me-2"></i>Konten
        </a>
        <a class="nav-link" routerLink="/transactions" routerLinkActive="active" (click)="close()">
          <i class="bi bi-arrow-left-right me-2"></i>Transaktionen
        </a>
        <a class="nav-link" routerLink="/operations" routerLinkActive="active" (click)="close()">
          <i class="bi bi-gear me-2"></i>Operationen
        </a>
      </nav>
      
      <div class="p-3 border-top bg-light">
        @if (userProfile$ | async; as profile) {
          <div class="d-flex flex-column gap-2">
            <div class="text-secondary small fw-medium">{{ profile.name }}</div>
            <button class="btn btn-outline-primary btn-sm w-100" (click)="logout()">
              <i class="bi bi-box-arrow-right me-1"></i>
              Abmelden
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .nav-link {
      color: var(--bs-secondary);
      text-decoration: none;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.25rem;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      
      &:hover {
        background-color: var(--bs-light);
        color: var(--bs-dark);
      }
      
      &.active {
        background-color: rgba(var(--bs-primary-rgb), 0.1);
        color: var(--bs-primary);
        font-weight: 600;
      }
    }
  `]
})
export class MobileNavComponent {
  private activeOffcanvas = inject(NgbActiveOffcanvas);
  private auth = inject(AuthService);
  
  protected userProfile$ = this.auth.user$.pipe(
    map(user => ({
      name: user?.name || '',
      email: user?.email || ''
    }))
  );
  
  protected close(): void {
    this.activeOffcanvas.close();
  }
  
  protected logout(): void {
    this.activeOffcanvas.close();
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
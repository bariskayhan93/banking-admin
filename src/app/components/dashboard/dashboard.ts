import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin';
import { SeedStatus } from '../../models/admin.model';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private adminService = inject(AdminService);
  private router = inject(Router);

  protected stats$!: Observable<{
    totalPersons: number;
    totalAccounts: number;
    totalTransactions: number;
    totalBalance: number;
  }>;
  protected seedStatus$!: Observable<SeedStatus>;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.stats$ = this.adminService.getDashboardStats();
    this.seedStatus$ = this.adminService.getSeedStatus();
  }

  protected navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  protected initializeSeed(): void {
    this.adminService.initializeSeed().subscribe({
      next: () => {
        this.loadData();
      },
      error: (error) => {
        console.error('Failed to initialize seed:', error);
      }
    });
  }
}

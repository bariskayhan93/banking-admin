import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Observable, combineLatest, map } from 'rxjs';
import { AdminService } from '../../services/admin';
import { PersonService } from '../../services/person';
import { AccountService } from '../../services/account';
import { TransactionService } from '../../services/transaction';
import { SeedStatus } from '../../models/admin.model';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private adminService = inject(AdminService);
  private personService = inject(PersonService);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
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
    this.stats$ = combineLatest([
      this.personService.getPersons(),
      this.accountService.getAccounts(),
      this.transactionService.getTransactions()
    ]).pipe(
      map(([persons, accounts, transactions]) => ({
        totalPersons: persons.length,
        totalAccounts: accounts.length,
        totalTransactions: transactions.length,
        totalBalance: accounts.reduce((sum, account) => sum + account.balance, 0)
      }))
    );
    
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

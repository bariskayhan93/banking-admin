import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: 'auth/callback',
    loadComponent: () => import('./auth/callback/callback').then(c => c.Callback)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard),
    canActivate: [authGuardFn]
  },
  {
    path: 'persons',
    loadComponent: () => import('./components/persons/person-list/person-list').then(c => c.PersonList),
    canActivate: [authGuardFn]
  },
  {
    path: 'accounts',
    loadComponent: () => import('./components/accounts/account-list/account-list').then(c => c.AccountList),
    canActivate: [authGuardFn]
  },
  {
    path: 'transactions',
    loadComponent: () => import('./components/transactions/transaction-list/transaction-list').then(c => c.TransactionList),
    canActivate: [authGuardFn]
  },
  {
    path: 'operations',
    loadComponent: () => import('./components/operations/banking-operations/banking-operations').then(c => c.BankingOperations),
    canActivate: [authGuardFn]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

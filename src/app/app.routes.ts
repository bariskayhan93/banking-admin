import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing').then(c => c.Landing)
  },
  {
    path: 'auth/callback',
    loadComponent: () => import('./auth/callback/callback').then(c => c.Callback)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'persons',
    loadComponent: () => import('./components/persons/person-list/person-list').then(c => c.PersonList),
    canActivate: [authGuard]
  },
  {
    path: 'accounts',
    loadComponent: () => import('./components/accounts/account-list/account-list').then(c => c.AccountList),
    canActivate: [authGuard]
  },
  {
    path: 'transactions',
    loadComponent: () => import('./components/transactions/transaction-list/transaction-list').then(c => c.TransactionList),
    canActivate: [authGuard]
  },
  {
    path: 'operations',
    loadComponent: () => import('./components/operations/banking-operations/banking-operations').then(c => c.BankingOperations),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/' }
];

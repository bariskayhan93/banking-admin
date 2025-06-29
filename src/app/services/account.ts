import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { BankAccount, CreateBankAccountRequest } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private api = inject(ApiService);

  getAccounts(): Observable<BankAccount[]> {
    return this.api.get<BankAccount[]>('/bank-accounts');
  }

  getAccount(iban: string): Observable<BankAccount> {
    return this.api.get<BankAccount>(`/bank-accounts/${iban}`);
  }

  createAccount(account: CreateBankAccountRequest): Observable<BankAccount> {
    return this.api.post<BankAccount>('/bank-accounts', account);
  }

  deleteAccount(iban: string): Observable<void> {
    return this.api.delete<void>(`/bank-accounts/${iban}`);
  }

  getAccountsByPerson(personId: string): Observable<BankAccount[]> {
    return this.api.get<BankAccount[]>(`/bank-accounts?personId=${personId}`);
  }
}

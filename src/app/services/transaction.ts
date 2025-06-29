import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { Transaction as TransactionModel, CreateTransactionRequest } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private api = inject(ApiService);

  getTransactions(): Observable<TransactionModel[]> {
    return this.api.get<TransactionModel[]>('/bank-transactions');
  }

  getTransaction(id: string): Observable<TransactionModel> {
    return this.api.get<TransactionModel>(`/bank-transactions/${id}`);
  }

  createTransaction(transaction: CreateTransactionRequest): Observable<TransactionModel> {
    return this.api.post<TransactionModel>('/bank-transactions', transaction);
  }

  getTransactionsByAccount(iban: string): Observable<TransactionModel[]> {
    return this.api.get<TransactionModel[]>(`/bank-transactions?iban=${iban}`);
  }
}

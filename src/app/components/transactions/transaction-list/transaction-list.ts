import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../../../services/transaction';
import { AccountService } from '../../../services/account';
import { Transaction, BankAccount } from '../../../models/admin.model';

@Component({
  selector: 'app-transaction-list',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss'
})
export class TransactionList {
  private transactionService = inject(TransactionService);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);

  protected transactions$ = this.transactionService.getTransactions();
  protected accounts$ = this.accountService.getAccounts();
  protected loading = signal(false);
  protected showCreateForm = signal(false);

  protected createForm = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    fromIban: [''],
    toIban: [''],
    description: ['']
  });

  protected toggleCreateForm(): void {
    this.showCreateForm.set(!this.showCreateForm());
    if (!this.showCreateForm()) {
      this.createForm.reset();
    }
  }

  protected createTransaction(): void {
    if (this.createForm.valid) {
      this.loading.set(true);
      const formValue = this.createForm.value;
      
      const transaction = {
        amount: formValue.amount!,
        fromIban: formValue.fromIban || undefined,
        toIban: formValue.toIban || undefined,
        description: formValue.description || undefined
      };

      this.transactionService.createTransaction(transaction).subscribe({
        next: () => {
          this.loading.set(false);
          this.showCreateForm.set(false);
          this.createForm.reset();
          this.transactions$ = this.transactionService.getTransactions();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  protected getTransactionType(transaction: Transaction): 'deposit' | 'withdrawal' | 'transfer' {
    if (transaction.fromIban && transaction.toIban) return 'transfer';
    if (transaction.fromIban) return 'withdrawal';
    return 'deposit';
  }

  protected getTransactionIcon(transaction: Transaction): string {
    const type = this.getTransactionType(transaction);
    switch (type) {
      case 'deposit': return 'bi-arrow-down-circle text-success';
      case 'withdrawal': return 'bi-arrow-up-circle text-danger';
      case 'transfer': return 'bi-arrow-left-right text-primary';
    }
  }

  protected getTransactionLabel(transaction: Transaction): string {
    const type = this.getTransactionType(transaction);
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'transfer': return 'Transfer';
    }
  }
}

import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, switchMap, of } from 'rxjs';
import { AccountService } from '../../../services/account';
import { PersonService } from '../../../services/person';
import { BankAccount, Person } from '../../../models/admin.model';

@Component({
  selector: 'app-account-list',
  imports: [AsyncPipe, CurrencyPipe, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss'
})
export class AccountList {
  private accountService = inject(AccountService);
  private personService = inject(PersonService);
  private fb = inject(FormBuilder);

  protected accounts$ = this.accountService.getAccounts();
  protected persons$ = this.personService.getPersons();
  protected loading = signal(false);
  protected selectedPersonId = signal<string>('');

  protected createForm = this.fb.group({
    personId: ['', [Validators.required]]
  });

  protected filterByPerson(personId: string): void {
    this.selectedPersonId.set(personId);
  }

  protected clearFilter(): void {
    this.selectedPersonId.set('');
  }

  protected filteredAccounts$: Observable<BankAccount[]> = this.accounts$.pipe(
    switchMap(accounts => {
      const personId = this.selectedPersonId();
      return of(personId ? accounts.filter(acc => acc.person.id === personId) : accounts);
    })
  );

  protected createAccount(): void {
    if (this.createForm.valid) {
      this.loading.set(true);
      const { personId } = this.createForm.value;
      
      this.accountService.createAccount({ personId: personId! }).subscribe({
        next: () => {
          this.loading.set(false);
          this.createForm.reset();
          this.accounts$ = this.accountService.getAccounts();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  protected deleteAccount(iban: string): void {
    if (confirm('Delete this account? This action cannot be undone.')) {
      this.loading.set(true);
      this.accountService.deleteAccount(iban).subscribe({
        next: () => {
          this.loading.set(false);
          this.accounts$ = this.accountService.getAccounts();
        },
        error: () => this.loading.set(false)
      });
    }
  }
}

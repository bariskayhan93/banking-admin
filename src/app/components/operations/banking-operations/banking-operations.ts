import { Component, inject, signal } from '@angular/core';
import {AsyncPipe, CurrencyPipe, DecimalPipe, NgClass} from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../services/admin';
import { PersonService } from '../../../services/person';
import { SeedStatus, LoanPotential, Person } from '../../../models/admin.model';

@Component({
  selector: 'app-banking-operations',
  imports: [AsyncPipe, DecimalPipe, NgClass, NgbDropdownModule, CurrencyPipe],
  templateUrl: './banking-operations.html',
  styleUrl: './banking-operations.scss'
})
export class BankingOperations {
  private adminService = inject(AdminService);
  private personService = inject(PersonService);

  protected seedStatus$ = this.adminService.getSeedStatus();
  protected persons$ = this.personService.getPersons();
  protected loading = signal(false);
  protected processLoading = signal<number | null>(null);
  protected loanPotentials = signal<LoanPotential[]>([]);
  protected selectedPersonLoan = signal<LoanPotential | null>(null);

  protected readonly processIds: (1 | 2 | 3)[] = [1, 2, 3];

  protected seedDatabase(): void {
    this.loading.set(true);
    this.adminService.initializeSeed().subscribe({
      next: () => {
        this.loading.set(false);
        this.seedStatus$ = this.adminService.getSeedStatus();
      },
      error: () => this.loading.set(false)
    });
  }

  protected executeProcess(processId: 1 | 2 | 3): void {
    this.processLoading.set(processId);
    this.adminService.executeProcess({ processId }).subscribe({
      next: (response) => {
        this.processLoading.set(null);
        if (processId === 3 && response.data) {
          this.loanPotentials.set(response.data);
        }
        if (processId === 2) {
          this.persons$ = this.personService.getPersons();
        }
      },
      error: () => this.processLoading.set(null)
    });
  }

  protected getLoanPotentialForPerson(personId: string): void {
    this.loading.set(true);
    this.adminService.getLoanPotentialForPerson(personId).subscribe({
      next: (loanPotential) => {
        this.loading.set(false);
        this.selectedPersonLoan.set(loanPotential);
      },
      error: () => this.loading.set(false)
    });
  }

  protected getPersonName(personId: string, persons: Person[]): string {
    return persons?.find(p => p.id === personId)?.name || 'Unknown';
  }

  protected getProcessDescription(processId: number): string {
    switch (processId) {
      case 1: return 'Update account balances';
      case 2: return 'Calculate net worths and friend recommendations';
      case 3: return 'Calculate loan potentials (includes 1 & 2)';
      default: return 'Unknown process';
    }
  }
}

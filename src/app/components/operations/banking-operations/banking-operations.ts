import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, switchMap, finalize, catchError, EMPTY } from 'rxjs';
import { PersonService } from '../../../services/person';
import { AdminService } from '../../../services/admin';
import { LoanPotential, Person } from '../../../models/admin.model';

@Component({
  selector: 'app-banking-operations',
  imports: [AsyncPipe, CurrencyPipe, DatePipe, NgbDropdownModule],
  templateUrl: './banking-operations.html',
  styleUrl: './banking-operations.scss'
})
export class BankingOperations {
  private personService = inject(PersonService);
  private adminService = inject(AdminService);

  protected persons$ = this.personService.getPersons();
  protected seedStatus$ = this.adminService.getSeedStatus();
  
  protected processLoading$ = new BehaviorSubject<number | null>(null);
  protected seedLoading$ = new BehaviorSubject(false);
  protected loanPotentials$ = new BehaviorSubject<LoanPotential[]>([]);
  protected selectedPersonLoan$ = new BehaviorSubject<LoanPotential | null>(null);
  protected selectedPersonLoading$ = new BehaviorSubject(false);

  protected readonly processIds: (1 | 2 | 3)[] = [1, 2, 3];

  protected executeProcess(processId: 1 | 2 | 3): void {
    this.processLoading$.next(processId);
    this.adminService.executeProcess({ processId }).pipe(
      finalize(() => this.processLoading$.next(null)),
      catchError(() => EMPTY)
    ).subscribe(response => {
      if (processId === 3 && response.data) {
        this.loanPotentials$.next(response.data as LoanPotential[]);
      }
      if (processId === 2) {
        this.persons$ = this.personService.getPersons();
      }
    });
  }

  protected seedDatabase(): void {
    this.seedLoading$.next(true);
    this.adminService.initializeSeed().pipe(
      switchMap(() => this.adminService.getSeedStatus()),
      finalize(() => this.seedLoading$.next(false)),
      catchError(() => EMPTY)
    ).subscribe(() => this.seedStatus$ = this.adminService.getSeedStatus());
  }

  protected getLoanPotentialForPerson(personId: string): void {
    this.selectedPersonLoading$.next(true);
    this.adminService.getLoanPotentialForPerson(personId).pipe(
      finalize(() => this.selectedPersonLoading$.next(false)),
      catchError(() => EMPTY)
    ).subscribe(loanPotential => this.selectedPersonLoan$.next(loanPotential));
  }

  protected getPersonName(personId: string, persons: Person[]): string {
    return persons?.find(p => p.id === personId)?.name || 'Unbekannt';
  }

  protected getProcessDescription(processId: number): string {
    const descriptions = {
      1: 'Kontostände aktualisieren',
      2: 'Nettovermögen und Freundschaftsempfehlungen berechnen', 
      3: 'Kreditpotentiale berechnen (inkl. 1 & 2)'
    };
    return descriptions[processId as keyof typeof descriptions] || 'Unbekannter Prozess';
  }
}

import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person, CreatePersonRequest, UpdatePersonRequest } from '../../../models/admin.model';
import { PersonService } from '../../../services/person';

@Component({
  selector: 'app-person-list',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss'
})
export class PersonList {
  private personService = inject(PersonService);
  private modal = inject(NgbModal);
  private fb = inject(FormBuilder);

  protected persons$ = this.personService.getPersons();
  protected loading = signal(false);
  protected showCreateForm = signal(false);
  protected editingPerson = signal<Person | null>(null);

  protected createForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  protected editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  protected toggleCreateForm(): void {
    this.showCreateForm.set(!this.showCreateForm());
    if (!this.showCreateForm()) {
      this.createForm.reset();
    }
  }

  protected startEdit(person: Person): void {
    this.editingPerson.set(person);
    this.editForm.patchValue({
      name: person.name,
      email: person.email
    });
  }

  protected cancelEdit(): void {
    this.editingPerson.set(null);
    this.editForm.reset();
  }

  protected createPerson(): void {
    if (this.createForm.valid) {
      this.loading.set(true);
      const person: CreatePersonRequest = this.createForm.value as CreatePersonRequest;
      
      this.personService.createPerson(person).subscribe({
        next: () => {
          this.loading.set(false);
          this.showCreateForm.set(false);
          this.createForm.reset();
          this.persons$ = this.personService.getPersons();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  protected updatePerson(): void {
    const person = this.editingPerson();
    if (this.editForm.valid && person) {
      this.loading.set(true);
      const updates: UpdatePersonRequest = this.editForm.value as UpdatePersonRequest;
      
      this.personService.updatePerson(person.id, updates).subscribe({
        next: () => {
          this.loading.set(false);
          this.cancelEdit();
          this.persons$ = this.personService.getPersons();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  protected deletePerson(person: Person): void {
    if (confirm(`Delete ${person.name}? This action cannot be undone.`)) {
      this.loading.set(true);
      this.personService.deletePerson(person.id).subscribe({
        next: () => {
          this.loading.set(false);
          this.persons$ = this.personService.getPersons();
        },
        error: () => this.loading.set(false)
      });
    }
  }
}

import { Injectable, inject } from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import { ApiService } from './api';
import { Person as PersonModel, CreatePersonRequest, UpdatePersonRequest } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private api = inject(ApiService);

  getPersons(): Observable<PersonModel[]> {
    return this.api.get<PersonModel[]>('/persons').pipe(shareReplay(1));
  }

  getPerson(id: string): Observable<PersonModel> {
    return this.api.get<PersonModel>(`/persons/${id}`);
  }

  createPerson(person: CreatePersonRequest): Observable<PersonModel> {
    return this.api.post<PersonModel>('/persons', person);
  }

  updatePerson(id: string, person: UpdatePersonRequest): Observable<PersonModel> {
    return this.api.put<PersonModel>(`/persons/${id}`, person);
  }

  deletePerson(id: string): Observable<void> {
    return this.api.delete<void>(`/persons/${id}`);
  }

  getPersonFriends(id: string): Observable<PersonModel[]> {
    return this.api.get<PersonModel[]>(`/persons/${id}/friends`);
  }

  addFriend(personId: string, friendId: string): Observable<void> {
    return this.api.post<void>(`/persons/${personId}/friends`, { friendId });
  }

  removeFriend(personId: string, friendId: string): Observable<void> {
    return this.api.delete<void>(`/persons/${personId}/friends/${friendId}`);
  }
}

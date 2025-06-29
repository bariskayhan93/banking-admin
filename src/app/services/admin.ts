import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { ProcessRequest, ProcessResponse, LoanPotential, SeedStatus } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = inject(ApiService);

  getSeedStatus(): Observable<SeedStatus> {
    return this.api.get<SeedStatus>('/seed/status');
  }

  initializeSeed(): Observable<void> {
    return this.api.post<void>('/seed');
  }

  executeProcess(request: ProcessRequest): Observable<ProcessResponse> {
    return this.api.post<ProcessResponse>('/processes', request);
  }

  getLoanPotentialForPerson(personId: string): Observable<LoanPotential> {
    return this.api.get<LoanPotential>(`/processes/persons/${personId}/loan-potential`);
  }
}

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api';
import { ProcessRequest, LoanPotential, SeedStatus, AdminUser } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = inject(ApiService);

  getSeedStatus(): Observable<SeedStatus> {
    return this.api.get<SeedStatus>('/seed');
  }

  initializeSeed(): Observable<void> {
    return this.api.post<void>('/seed');
  }

  executeProcess(request: ProcessRequest): Observable<any> {
    return this.api.post<any>('/processes', request);
  }

  getLoanPotentials(): Observable<LoanPotential[]> {
    return this.api.get<LoanPotential[]>('/processes/loans');
  }

  getAdminProfile(): Observable<AdminUser> {
    return this.api.get<AdminUser>('/admin/profile');
  }

  getDashboardStats(): Observable<{
    totalPersons: number;
    totalAccounts: number;
    totalTransactions: number;
    totalBalance: number;
  }> {
    return this.api.get('/admin/stats');
  }
}

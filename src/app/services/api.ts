import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const TIMEOUT_MS = 30000;
const MAX_RETRIES = 2;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  get<T>(endpoint: string, params?: Record<string, string | number>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { 
      params: params ? this.createParams(params) : undefined 
    }).pipe(
      timeout(TIMEOUT_MS),
      retry(MAX_RETRIES),
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body?: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body)
      .pipe(timeout(TIMEOUT_MS), catchError(this.handleError));
  }

  put<T>(endpoint: string, body?: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body)
      .pipe(timeout(TIMEOUT_MS), catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`)
      .pipe(timeout(TIMEOUT_MS), catchError(this.handleError));
  }

  private createParams(params: Record<string, string | number>): HttpParams {
    return Object.entries(params).reduce(
      (httpParams, [key, value]) => 
        value != null ? httpParams.set(key, value.toString()) : httpParams,
      new HttpParams()
    );
  }

  private handleError = (error: HttpErrorResponse) => {
    const errorMap: Record<number, string> = {
      0: 'Unable to connect to server',
      400: error.error?.message || 'Bad request',
      401: 'Authentication required',
      403: 'Access denied',
      404: 'Resource not found',
      500: 'Internal server error',
      503: 'Service unavailable'
    };

    const message = error.error instanceof ErrorEvent 
      ? `Network error: ${error.error.message}`
      : errorMap[error.status] || `Server error: ${error.status}`;

    console.error('API Error:', error);
    return throwError(() => new Error(message));
  };
}

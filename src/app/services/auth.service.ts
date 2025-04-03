import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginCredentials, AuthResponse, User, AuthState } from '../interfaces/auth.interface';
import { EmployeeRegister, EmployerRegister } from '../interfaces/register.interface';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  redirectUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private mockDataService: MockDataService
  ) {
    const storedUser = localStorage.getItem(environment.auth.userKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(user => {
          localStorage.setItem(environment.auth.tokenKey, user.token);
          localStorage.setItem(environment.auth.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  registerEmployee(data: EmployeeRegister): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register/employee`, data)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
        })
      );
  }

  registerEmployer(data: EmployerRegister): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register/employer`, data)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(environment.auth.tokenKey);
    localStorage.removeItem(environment.auth.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.auth.tokenKey);
  }

  isJobSeeker(): boolean {
    return this.currentUser?.role === 'JobSeeker';
  }

  isRecruiter(): boolean {
    return this.currentUser?.role === 'Recruiter';
  }

  register(userData: {
    email: string;
    password: string;
    name: string;
    role: 'JobSeeker' | 'Recruiter';
  }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(user => {
          localStorage.setItem(environment.auth.tokenKey, user.token);
          localStorage.setItem(environment.auth.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  updateProfile(formData: FormData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, formData)
      .pipe(
        tap(user => {
          localStorage.setItem(environment.auth.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  getCurrentUserId(): string | null {
    return this.currentUser?.id?.toString() || null;
  }

  getCurrentUser(): User | null {
    return this.currentUser || null;
  }

  getEmployeeProfile(userId: string): Observable<EmployeeRegister> {
    return this.mockDataService.getEmployeeProfile(userId);
  }

  updateEmployeeProfile(userId: string, data: Partial<EmployeeRegister>): Observable<EmployeeRegister> {
    return this.mockDataService.updateEmployeeProfile(userId, data);
  }
}

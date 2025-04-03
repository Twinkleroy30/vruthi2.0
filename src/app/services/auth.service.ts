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
  private readonly AUTH_KEY = 'auth_state';
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  redirectUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private mockDataService: MockDataService
  ) {
    this.loadAuthState();
  }

  get currentUser$(): Observable<User | null> {
    return this.authState.asObservable().pipe(
      map(state => state.user)
    );
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable().pipe(
      map(state => state.isAuthenticated)
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
        
        if (user) {
          const response: AuthResponse = {
            token: 'mock-token-' + Date.now(),
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              createdAt: user.createdAt || new Date().toISOString(),
              updatedAt: user.updatedAt || new Date().toISOString()
            }
          };
          this.handleAuthSuccess(response);
          observer.next(response);
          observer.complete();
        } else {
          observer.error({ message: 'Invalid email or password' });
        }
      }, 1000);
    });
  }

  registerEmployee(data: EmployeeRegister): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register/employee`, data)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
        })
      );
  }

  registerEmployer(data: EmployerRegister): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register/employer`, data)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.authState.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.authState.value.token;
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  private handleAuthSuccess(response: AuthResponse): void {
    const authState: AuthState = {
      isAuthenticated: true,
      user: response.user,
      token: response.token
    };
    
    localStorage.setItem(this.AUTH_KEY, JSON.stringify(authState));
    this.authState.next(authState);
  }

  private loadAuthState(): void {
    const storedState = localStorage.getItem(this.AUTH_KEY);
    
    if (storedState) {
      try {
        const authState: AuthState = JSON.parse(storedState);
        this.authState.next(authState);
      } catch (error) {
        console.error('Error parsing auth state:', error);
        this.logout();
      }
    }
  }

  getCurrentUserId(): string | null {
    return this.authState.value.user?.id?.toString() || null;
  }

  getCurrentUser(): User | null {
    return this.authState.value.user || null;
  }

  getEmployeeProfile(userId: string): Observable<EmployeeRegister> {
    return this.mockDataService.getEmployeeProfile(userId);
  }

  updateEmployeeProfile(userId: string, data: Partial<EmployeeRegister>): Observable<EmployeeRegister> {
    return this.mockDataService.updateEmployeeProfile(userId, data);
  }

  register(userData: any): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.some((user: any) => user.email === userData.email)) {
          observer.error({ message: 'Email already exists' });
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          ...userData,
          name: `${userData.firstName} ${userData.lastName}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        observer.next({ message: 'Registration successful' });
        observer.complete();
      }, 1000);
    });
  }
}

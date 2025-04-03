import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'JobSeeker',
      token: 'test-token'
    };

    service.login('test@example.com', 'password').subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem(environment.auth.tokenKey)).toBe('test-token');
      expect(localStorage.getItem(environment.auth.userKey)).toBe(JSON.stringify(mockUser));
      expect(service.currentUser).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should register', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'JobSeeker',
      token: 'test-token'
    };

    service.register({
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      role: 'JobSeeker'
    }).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem(environment.auth.tokenKey)).toBe('test-token');
      expect(localStorage.getItem(environment.auth.userKey)).toBe(JSON.stringify(mockUser));
      expect(service.currentUser).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should logout', () => {
    localStorage.setItem(environment.auth.tokenKey, 'test-token');
    localStorage.setItem(environment.auth.userKey, JSON.stringify({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'JobSeeker',
      token: 'test-token'
    }));

    service.logout();
    expect(localStorage.getItem(environment.auth.tokenKey)).toBeNull();
    expect(localStorage.getItem(environment.auth.userKey)).toBeNull();
    expect(service.currentUser).toBeNull();
  });

  it('should update profile', () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      name: 'Updated User',
      role: 'JobSeeker',
      token: 'test-token'
    };

    const formData = new FormData();
    service.updateProfile(formData).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(localStorage.getItem(environment.auth.userKey)).toBe(JSON.stringify(mockUser));
      expect(service.currentUser).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/profile`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  it('should check if user is authenticated', () => {
    expect(service.isAuthenticated).toBeFalse();

    localStorage.setItem(environment.auth.userKey, JSON.stringify({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'JobSeeker',
      token: 'test-token'
    }));

    expect(service.isAuthenticated).toBeTrue();
  });

  it('should check if user is job seeker', () => {
    expect(service.isJobSeeker()).toBeFalse();

    localStorage.setItem(environment.auth.userKey, JSON.stringify({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'JobSeeker',
      token: 'test-token'
    }));

    expect(service.isJobSeeker()).toBeTrue();
  });

  it('should check if user is recruiter', () => {
    expect(service.isRecruiter()).toBeFalse();

    localStorage.setItem(environment.auth.userKey, JSON.stringify({
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'Recruiter',
      token: 'test-token'
    }));

    expect(service.isRecruiter()).toBeTrue();
  });
});

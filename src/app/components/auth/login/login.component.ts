import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Login</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="form-group mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    [(ngModel)]="email"
                    required
                    email
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    [(ngModel)]="password"
                    required
                  />
                </div>
                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">
                    Login
                  </button>
                </div>
                <div class="text-center mt-3">
                  <p>Don't have an account? <a routerLink="/register">Register here</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .card-header {
      background-color: #f8f9fa;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Navigation will be handled by the auth service
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle error (show message to user)
      }
    });
  }
}

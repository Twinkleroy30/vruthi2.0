import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Register</h3>
            </div>
            <div class="card-body">
              <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                <div class="form-group mb-3">
                  <label for="name">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    [(ngModel)]="name"
                    required
                  />
                </div>
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
                    minlength="6"
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="role">Role</label>
                  <select
                    class="form-control"
                    id="role"
                    name="role"
                    [(ngModel)]="role"
                    required
                  >
                    <option value="jobseeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary" [disabled]="!registerForm.form.valid">
                    Register
                  </button>
                </div>
                <div class="text-center mt-3">
                  <p>Already have an account? <a routerLink="/login">Login here</a></p>
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
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'jobseeker';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        // Navigation will be handled by the auth service
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Handle error (show message to user)
      }
    });
  }
}

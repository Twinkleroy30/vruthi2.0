import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Profile</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label for="name">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    formControlName="name"
                    [class.is-invalid]="name.invalid && name.touched"
                  />
                  <div class="invalid-feedback" *ngIf="name.invalid && name.touched">
                    Name is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [class.is-invalid]="email.invalid && email.touched"
                    readonly
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="phone">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    formControlName="phone"
                    [class.is-invalid]="phone.invalid && phone.touched"
                  />
                  <div class="invalid-feedback" *ngIf="phone.invalid && phone.touched">
                    Valid phone number is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="location">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    id="location"
                    formControlName="location"
                    [class.is-invalid]="location.invalid && location.touched"
                  />
                  <div class="invalid-feedback" *ngIf="location.invalid && location.touched">
                    Location is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="bio">Bio</label>
                  <textarea
                    class="form-control"
                    id="bio"
                    formControlName="bio"
                    rows="4"
                    [class.is-invalid]="bio.invalid && bio.touched"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="bio.invalid && bio.touched">
                    Bio is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="skills">Skills (comma separated)</label>
                  <input
                    type="text"
                    class="form-control"
                    id="skills"
                    formControlName="skills"
                    [class.is-invalid]="skills.invalid && skills.touched"
                  />
                  <div class="invalid-feedback" *ngIf="skills.invalid && skills.touched">
                    At least one skill is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="resume">Resume (PDF)</label>
                  <input
                    type="file"
                    class="form-control"
                    id="resume"
                    (change)="onFileSelected($event)"
                    accept=".pdf"
                  />
                </div>

                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid">
                    Update Profile
                  </button>
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
    .form-group {
      margin-bottom: 1rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      bio: ['', Validators.required],
      skills: ['', Validators.required],
      resume: [null]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  get name() { return this.profileForm.get('name')!; }
  get email() { return this.profileForm.get('email')!; }
  get phone() { return this.profileForm.get('phone')!; }
  get location() { return this.profileForm.get('location')!; }
  get bio() { return this.profileForm.get('bio')!; }
  get skills() { return this.profileForm.get('skills')!; }

  loadProfile(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          bio: user.bio,
          skills: user.skills?.join(', ')
        });
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        alert('Failed to load profile. Please try again.');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('phone', this.profileForm.value.phone);
    formData.append('location', this.profileForm.value.location);
    formData.append('bio', this.profileForm.value.bio);
    formData.append('skills', this.profileForm.value.skills);
    if (this.selectedFile) {
      formData.append('resume', this.selectedFile);
    }

    this.authService.updateProfile(formData).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    });
  }
}

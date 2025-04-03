import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Apply for Job</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="applicationForm" (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label for="coverLetter">Cover Letter</label>
                  <textarea
                    class="form-control"
                    id="coverLetter"
                    formControlName="coverLetter"
                    rows="6"
                    [class.is-invalid]="coverLetter.invalid && coverLetter.touched"
                    placeholder="Write your cover letter here..."
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="coverLetter.invalid && coverLetter.touched">
                    Cover letter is required
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
                    [class.is-invalid]="resume.invalid && resume.touched"
                  />
                  <div class="invalid-feedback" *ngIf="resume.invalid && resume.touched">
                    Resume is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="linkedin">LinkedIn Profile (Optional)</label>
                  <input
                    type="url"
                    class="form-control"
                    id="linkedin"
                    formControlName="linkedin"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="portfolio">Portfolio Website (Optional)</label>
                  <input
                    type="url"
                    class="form-control"
                    id="portfolio"
                    formControlName="portfolio"
                    placeholder="https://your-portfolio.com"
                  />
                </div>

                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary" [disabled]="applicationForm.invalid">
                    Submit Application
                  </button>
                  <button type="button" class="btn btn-secondary ms-2" (click)="onCancel()">
                    Cancel
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
export class JobApplicationComponent implements OnInit {
  applicationForm: FormGroup;
  jobId: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      coverLetter: ['', [Validators.required, Validators.minLength(100)]],
      linkedin: [''],
      portfolio: [''],
      resume: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.jobId) {
      this.router.navigate(['/jobs']);
    }
  }

  get coverLetter() { return this.applicationForm.get('coverLetter')!; }
  get resume() { return this.applicationForm.get('resume')!; }
  get linkedin() { return this.applicationForm.get('linkedin')!; }
  get portfolio() { return this.applicationForm.get('portfolio')!; }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.applicationForm.patchValue({ resume: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.applicationForm.invalid || !this.jobId || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('coverLetter', this.applicationForm.value.coverLetter);
    formData.append('resume', this.selectedFile);
    if (this.applicationForm.value.linkedin) {
      formData.append('linkedin', this.applicationForm.value.linkedin);
    }
    if (this.applicationForm.value.portfolio) {
      formData.append('portfolio', this.applicationForm.value.portfolio);
    }

    this.jobService.applyForJob(this.jobId, formData).subscribe({
      next: () => {
        alert('Application submitted successfully!');
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (error) => {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
      }
    });
  }

  onCancel(): void {
    if (this.jobId) {
      this.router.navigate(['/jobs', this.jobId]);
    } else {
      this.router.navigate(['/jobs']);
    }
  }
} 
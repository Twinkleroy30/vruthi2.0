import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { Job } from '../../../interfaces/job.interface';

@Component({
  selector: 'app-job-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Edit Job</h3>
            </div>
            <div class="card-body">
              <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label for="title">Job Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    formControlName="title"
                    [class.is-invalid]="title.invalid && title.touched"
                  />
                  <div class="invalid-feedback" *ngIf="title.invalid && title.touched">
                    Job title is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="company">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="company"
                    formControlName="company"
                    [class.is-invalid]="company.invalid && company.touched"
                  />
                  <div class="invalid-feedback" *ngIf="company.invalid && company.touched">
                    Company name is required
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
                  <label for="type">Job Type</label>
                  <select
                    class="form-control"
                    id="type"
                    formControlName="type"
                    [class.is-invalid]="type.invalid && type.touched"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <div class="invalid-feedback" *ngIf="type.invalid && type.touched">
                    Job type is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="description">Job Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    formControlName="description"
                    rows="4"
                    [class.is-invalid]="description.invalid && description.touched"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="description.invalid && description.touched">
                    Description is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="requirements">Requirements (one per line)</label>
                  <textarea
                    class="form-control"
                    id="requirements"
                    formControlName="requirements"
                    rows="4"
                    [class.is-invalid]="requirements.invalid && requirements.touched"
                  ></textarea>
                  <div class="invalid-feedback" *ngIf="requirements.invalid && requirements.touched">
                    At least one requirement is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="salary">Salary Range</label>
                  <input
                    type="text"
                    class="form-control"
                    id="salary"
                    formControlName="salary"
                    [class.is-invalid]="salary.invalid && salary.touched"
                  />
                  <div class="invalid-feedback" *ngIf="salary.invalid && salary.touched">
                    Salary range is required
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label for="deadline">Application Deadline</label>
                  <input
                    type="date"
                    class="form-control"
                    id="deadline"
                    formControlName="deadline"
                    [class.is-invalid]="deadline.invalid && deadline.touched"
                  />
                  <div class="invalid-feedback" *ngIf="deadline.invalid && deadline.touched">
                    Deadline is required
                  </div>
                </div>

                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary" [disabled]="jobForm.invalid">
                    Update Job
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
export class JobEditComponent implements OnInit {
  jobForm: FormGroup;
  jobId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      type: ['Full-time', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      salary: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.jobId) {
      this.loadJob();
    }
  }

  get title() { return this.jobForm.get('title')!; }
  get company() { return this.jobForm.get('company')!; }
  get location() { return this.jobForm.get('location')!; }
  get type() { return this.jobForm.get('type')!; }
  get description() { return this.jobForm.get('description')!; }
  get requirements() { return this.jobForm.get('requirements')!; }
  get salary() { return this.jobForm.get('salary')!; }
  get deadline() { return this.jobForm.get('deadline')!; }

  loadJob(): void {
    if (!this.jobId) return;

    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => {
        this.jobForm.patchValue({
          ...job,
          requirements: job.requirements.join('\n'),
          deadline: job.deadline.toISOString().split('T')[0]
        });
      },
      error: (error) => {
        console.error('Error loading job:', error);
        alert('Failed to load job details. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid || !this.jobId) {
      return;
    }

    const jobData: Partial<Job> = {
      ...this.jobForm.value,
      requirements: this.jobForm.value.requirements.split('\n').filter((req: string) => req.trim()),
      deadline: new Date(this.jobForm.value.deadline)
    };

    this.jobService.updateJob(this.jobId, jobData).subscribe({
      next: () => {
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (error) => {
        console.error('Error updating job:', error);
        alert('Failed to update job. Please try again.');
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
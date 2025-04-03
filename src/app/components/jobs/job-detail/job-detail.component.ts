import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../../services/job.service';
import { AuthService } from '../../../services/auth.service';
import { Job } from '../../../interfaces/job.interface';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job | null = null;
  isLoading = true;
  hasApplied = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (jobId) {
      this.loadJobDetails(jobId);
    }
  }

  loadJobDetails(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe({
      next: (job: Job) => {
        this.job = job;
        this.checkApplicationStatus();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading job details:', error);
        this.errorMessage = 'Failed to load job details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  checkApplicationStatus(): void {
    if (this.job && this.authService.isJobSeeker()) {
      this.jobService.getMyApplications().subscribe({
        next: (applications) => {
          this.hasApplied = applications.some(app => app.jobId === this.job?.id);
        },
        error: (error: any) => {
          console.error('Error checking application status:', error);
        }
      });
    }
  }

  applyForJob(): void {
    if (!this.job) return;

    const formData = new FormData();
    formData.append('jobId', this.job.id.toString());
    formData.append('coverLetter', 'I am interested in this position...');
    formData.append('resume', new File([], 'resume.pdf'));

    this.jobService.applyForJob(this.job.id, formData).subscribe({
      next: () => {
        this.hasApplied = true;
        this.router.navigate(['/jobs', this.job?.id, 'application-success']);
      },
      error: (error: any) => {
        console.error('Error applying for job:', error);
        this.errorMessage = 'Failed to apply for the job. Please try again.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

  get isEmployer(): boolean {
    return this.authService.isRecruiter();
  }

  deleteJob(): void {
    if (!this.job) return;
    
    if (confirm('Are you sure you want to delete this job posting?')) {
      this.jobService.deleteJob(this.job.id).subscribe({
        next: () => {
          // Navigation will be handled by the service
        },
        error: (error) => {
          console.error('Error deleting job:', error);
          alert('Failed to delete the job. Please try again.');
        }
      });
    }
  }
}

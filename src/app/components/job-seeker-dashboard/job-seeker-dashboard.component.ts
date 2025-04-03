import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../services/job.service';
import { JobApplication } from '../../interfaces/job-application.interface';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-job-seeker-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.css']
})
export class JobSeekerDashboardComponent implements OnInit {
  appliedJobs: JobApplication[] = [];
  recommendedJobs: Job[] = [];
  isLoading = true;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAppliedJobs();
    this.loadRecommendedJobs();
  }

  loadAppliedJobs(): void {
    this.jobService.getMyApplications().subscribe({
      next: (jobs: JobApplication[]) => {
        this.appliedJobs = jobs;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading applied jobs:', error);
        this.isLoading = false;
      }
    });
  }

  loadRecommendedJobs(): void {
    this.jobService.getRecommendedJobs().subscribe({
      next: (jobs: Job[]) => {
        this.recommendedJobs = jobs;
      },
      error: (error: any) => {
        console.error('Error loading recommended jobs:', error);
      }
    });
  }
} 
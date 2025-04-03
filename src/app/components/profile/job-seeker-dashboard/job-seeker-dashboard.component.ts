import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../../services/job.service';
import { JobApplication } from '../../../interfaces/job-application.interface';

@Component({
  selector: 'app-job-seeker-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrls: ['./job-seeker-dashboard.component.css']
})
export class JobSeekerDashboardComponent implements OnInit {
  appliedJobs: JobApplication[] = [];
  isLoading = true;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAppliedJobs();
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
} 
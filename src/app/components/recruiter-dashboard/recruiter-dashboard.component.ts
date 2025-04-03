import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobService } from '../../services/job.service';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  postedJobs: Job[] = [];
  isLoading = true;
  stats = {
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0
  };

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadPostedJobs();
  }

  loadPostedJobs(): void {
    this.jobService.getPostedJobs().subscribe({
      next: (jobs: Job[]) => {
        this.postedJobs = jobs;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading posted jobs:', error);
        this.isLoading = false;
      }
    });
  }

  calculateStats(): void {
    this.stats = {
      totalJobs: this.postedJobs.length,
      activeJobs: this.postedJobs.filter(job => job.status === 'Active').length,
      totalApplications: this.postedJobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0)
    };
  }
} 
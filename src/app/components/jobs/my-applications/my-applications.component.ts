import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { JobApplication } from '../../../interfaces/job-application.interface';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col">
          <h2>My Applications</h2>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-6 mb-4" *ngFor="let application of applications">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">
                <a [routerLink]="['/jobs', application.jobId]">
                  {{ application.jobTitle }}
                </a>
              </h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ application.companyName }}</h6>
              <p class="card-text">
                <strong>Status:</strong> 
                <span [ngClass]="{
                  'text-success': application.status === 'Accepted',
                  'text-danger': application.status === 'Rejected',
                  'text-warning': application.status === 'Pending'
                }">
                  {{ application.status }}
                </span>
                <br>
                <strong>Applied:</strong> {{ application.appliedDate | date }}
                <br>
                <strong>Last Updated:</strong> {{ application.updatedDate | date }}
              </p>
              <div class="d-flex gap-2">
                <a [routerLink]="['/jobs', application.jobId]" class="btn btn-primary">
                  View Job
                </a>
                <a [href]="application.resumeUrl" target="_blank" class="btn btn-secondary">
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-info" *ngIf="applications.length === 0">
        You haven't applied to any jobs yet. <a routerLink="/jobs">Browse available jobs</a> to get started.
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card-title {
      color: #2c3e50;
    }
    .card-subtitle {
      color: #666;
    }
    .card-text {
      color: #666;
    }
    .btn {
      margin-right: 5px;
    }
  `]
})
export class MyApplicationsComponent implements OnInit {
  applications: (JobApplication & { jobTitle: string; companyName: string })[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.jobService.getMyApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
        alert('Failed to load your applications. Please try again.');
      }
    });
  }
} 
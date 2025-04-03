import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Job } from '../interfaces/job.interface';
import { JobApplication } from '../interfaces/job-application.interface';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/jobs`, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/jobs/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobs/${id}`);
  }

  applyForJob(jobId: number, formData: FormData): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/jobs/${jobId}/apply`, formData);
  }

  getJobApplications(jobId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/jobs/${jobId}/applications`);
  }

  updateApplicationStatus(jobId: number, applicationId: number, status: 'Accepted' | 'Rejected'): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.apiUrl}/jobs/${jobId}/applications/${applicationId}`, { status });
  }

  getMyApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/jobs/my-applications`);
  }

  getPostedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/posted`);
  }

  getRecommendedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/recommended`);
  }
} 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private apiUrl = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  createJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(id: number, job: Partial<Job>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPostedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/posted`);
  }

  getAppliedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/applied`);
  }

  applyForJob(jobId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${jobId}/apply`, {});
  }

  updateApplicationStatus(jobId: number, applicationId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${jobId}/applications/${applicationId}`, { status });
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobService } from './job.service';
import { Job } from '../interfaces/job.interface';
import { JobApplication } from '../interfaces/job-application.interface';
import { environment } from '../../environments/environment';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService]
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get jobs', () => {
    const mockJobs: Job[] = [
      {
        id: 1,
        title: 'Test Job',
        company: 'Test Company',
        location: 'Test Location',
        type: 'Full-time',
        description: 'Test Description',
        requirements: 'Test Requirements',
        salary: 'Test Salary',
        postedBy: 1,
        postedDate: new Date(),
        deadline: new Date(),
        status: 'Active'
      }
    ];

    service.getJobs().subscribe(jobs => {
      expect(jobs).toEqual(mockJobs);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs`);
    expect(req.request.method).toBe('GET');
    req.flush(mockJobs);
  });

  it('should get job by id', () => {
    const mockJob: Job = {
      id: 1,
      title: 'Test Job',
      company: 'Test Company',
      location: 'Test Location',
      type: 'Full-time',
      description: 'Test Description',
      requirements: 'Test Requirements',
      salary: 'Test Salary',
      postedBy: 1,
      postedDate: new Date(),
      deadline: new Date(),
      status: 'Active'
    };

    service.getJob(1).subscribe(job => {
      expect(job).toEqual(mockJob);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockJob);
  });

  it('should create job', () => {
    const mockJob: Job = {
      id: 1,
      title: 'Test Job',
      company: 'Test Company',
      location: 'Test Location',
      type: 'Full-time',
      description: 'Test Description',
      requirements: 'Test Requirements',
      salary: 'Test Salary',
      postedBy: 1,
      postedDate: new Date(),
      deadline: new Date(),
      status: 'Active'
    };

    service.createJob(mockJob).subscribe(job => {
      expect(job).toEqual(mockJob);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs`);
    expect(req.request.method).toBe('POST');
    req.flush(mockJob);
  });

  it('should update job', () => {
    const mockJob: Job = {
      id: 1,
      title: 'Updated Job',
      company: 'Test Company',
      location: 'Test Location',
      type: 'Full-time',
      description: 'Test Description',
      requirements: 'Test Requirements',
      salary: 'Test Salary',
      postedBy: 1,
      postedDate: new Date(),
      deadline: new Date(),
      status: 'Active'
    };

    service.updateJob(1, mockJob).subscribe(job => {
      expect(job).toEqual(mockJob);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockJob);
  });

  it('should delete job', () => {
    service.deleteJob(1).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should apply for job', () => {
    const mockApplication: JobApplication = {
      id: 1,
      jobId: 1,
      applicantId: 1,
      applicantName: 'Test Applicant',
      applicantEmail: 'test@example.com',
      coverLetter: 'Test Cover Letter',
      resumeUrl: 'test-resume.pdf',
      status: 'Pending',
      appliedDate: new Date(),
      updatedDate: new Date()
    };

    const formData = new FormData();
    service.applyForJob(1, formData).subscribe(application => {
      expect(application).toEqual(mockApplication);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1/apply`);
    expect(req.request.method).toBe('POST');
    req.flush(mockApplication);
  });

  it('should get job applications', () => {
    const mockApplications: JobApplication[] = [
      {
        id: 1,
        jobId: 1,
        applicantId: 1,
        applicantName: 'Test Applicant',
        applicantEmail: 'test@example.com',
        coverLetter: 'Test Cover Letter',
        resumeUrl: 'test-resume.pdf',
        status: 'Pending',
        appliedDate: new Date(),
        updatedDate: new Date()
      }
    ];

    service.getJobApplications(1).subscribe(applications => {
      expect(applications).toEqual(mockApplications);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1/applications`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApplications);
  });

  it('should update application status', () => {
    const mockApplication: JobApplication = {
      id: 1,
      jobId: 1,
      applicantId: 1,
      applicantName: 'Test Applicant',
      applicantEmail: 'test@example.com',
      coverLetter: 'Test Cover Letter',
      resumeUrl: 'test-resume.pdf',
      status: 'Accepted',
      appliedDate: new Date(),
      updatedDate: new Date()
    };

    service.updateApplicationStatus(1, 1, 'Accepted').subscribe(application => {
      expect(application).toEqual(mockApplication);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/1/applications/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockApplication);
  });

  it('should get my applications', () => {
    const mockApplications: JobApplication[] = [
      {
        id: 1,
        jobId: 1,
        applicantId: 1,
        applicantName: 'Test Applicant',
        applicantEmail: 'test@example.com',
        coverLetter: 'Test Cover Letter',
        resumeUrl: 'test-resume.pdf',
        status: 'Pending',
        appliedDate: new Date(),
        updatedDate: new Date()
      }
    ];

    service.getMyApplications().subscribe(applications => {
      expect(applications).toEqual(mockApplications);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/my-applications`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApplications);
  });

  it('should get recommended jobs', () => {
    const mockJobs: Job[] = [
      {
        id: 1,
        title: 'Test Job',
        company: 'Test Company',
        location: 'Test Location',
        type: 'Full-time',
        description: 'Test Description',
        requirements: 'Test Requirements',
        salary: 'Test Salary',
        postedBy: 1,
        postedDate: new Date(),
        deadline: new Date(),
        status: 'Active'
      }
    ];

    service.getRecommendedJobs().subscribe(jobs => {
      expect(jobs).toEqual(mockJobs);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/jobs/recommended`);
    expect(req.request.method).toBe('GET');
    req.flush(mockJobs);
  });
}); 
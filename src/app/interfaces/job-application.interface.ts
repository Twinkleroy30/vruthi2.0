export interface JobApplication {
  id: number;
  jobId: number;
  applicantId: number;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  resumeUrl: string;
  linkedin?: string;
  portfolio?: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedDate: Date;
  updatedDate: Date;
} 
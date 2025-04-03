export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  postedDate: Date;
  deadline: Date;
  status: 'Active' | 'Closed';
  applications?: JobApplication[];
  recruiterId: number;
  applicationStatus?: string;  // For job seeker view
  appliedDate?: Date;         // For job seeker view
  applicationsCount: number; // For recruiter view
} 
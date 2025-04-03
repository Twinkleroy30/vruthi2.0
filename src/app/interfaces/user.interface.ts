export interface User {
  id: number;
  email: string;
  name: string;
  role: 'JobSeeker' | 'Recruiter' | 'Admin';
  token: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  resumeUrl?: string;
  companyName?: string;
  companyDescription?: string;
  companyWebsite?: string;
} 
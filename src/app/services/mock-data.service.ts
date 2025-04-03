import { Injectable } from '@angular/core';
import { Job } from '../interfaces/job.interface';
import { Observable, of } from 'rxjs';
import { EmployeeRegister } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'We are looking for an experienced software engineer...',
      requirements: ['5+ years of experience', 'Strong problem-solving skills'],
      salary: '$120,000 - $150,000',
      postedDate: new Date('2024-01-15'),
      deadline: new Date('2024-02-15'),
      recruiterId: 1,
      applicationsCount: 0
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our team as a frontend developer...',
      requirements: ['3+ years of experience', 'Proficiency in Angular'],
      salary: '$90,000 - $110,000',
      postedDate: new Date('2024-01-20'),
      deadline: new Date('2024-02-20'),
      recruiterId: 2,
      applicationsCount: 0
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Data Analytics Co.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Looking for a backend developer...',
      requirements: ['4+ years of experience', 'Node.js expertise'],
      salary: '$100,000 - $130,000',
      postedDate: new Date('2024-01-25'),
      deadline: new Date('2024-02-25'),
      recruiterId: 3,
      applicationsCount: 0
    },
    {
      id: 4,
      title: 'Full Stack Developer',
      company: 'Cloud Systems',
      location: 'Seattle, WA',
      type: 'Full-time',
      description: 'Seeking a full stack developer...',
      requirements: ['5+ years of experience', 'Full stack development skills'],
      salary: '$110,000 - $140,000',
      postedDate: new Date('2024-01-30'),
      deadline: new Date('2024-02-28'),
      recruiterId: 4,
      applicationsCount: 0
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Mobile Apps Ltd',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'DevOps engineer position available...',
      requirements: ['4+ years of experience', 'Cloud infrastructure knowledge'],
      salary: '$100,000 - $130,000',
      postedDate: new Date('2024-02-01'),
      deadline: new Date('2024-03-01'),
      recruiterId: 5,
      applicationsCount: 0
    }
  ];

  private mockProfiles: { [key: string]: EmployeeRegister } = {
    '1': {
      username: 'john_doe',
      password: 'hashed_password',
      email: 'john@example.com',
      gender: 'male',
      phoneNumber: '1234567890',
      hometown: 'New York',
      interests: ['AI', 'ML', 'Web Development'],
      experience: 5,
      maritalStatus: 'single',
      nationality: 'US',
      languagesKnown: ['English', 'Spanish'],
      currentLocation: 'San Francisco',
      lastJobExperience: 'Software Engineer at Tech Corp',
      lastDesignation: 'Senior Developer',
      department: 'it',
      reasonForLeaving: 'Career growth opportunity'
    },
    '2': {
      username: 'sarah_smith',
      password: 'hashed_password',
      email: 'sarah@example.com',
      gender: 'female',
      phoneNumber: '9876543210',
      hometown: 'London',
      interests: ['UI/UX', 'Mobile Development', 'Cloud Computing'],
      experience: 3,
      maritalStatus: 'married',
      nationality: 'UK',
      languagesKnown: ['English', 'French'],
      currentLocation: 'London',
      lastJobExperience: 'UI Developer at Design Studio',
      lastDesignation: 'UI Developer',
      department: 'it',
      reasonForLeaving: 'Relocation'
    },
    '3': {
      username: 'alex_wilson',
      password: 'hashed_password',
      email: 'alex@example.com',
      gender: 'other',
      phoneNumber: '5555555555',
      hometown: 'Toronto',
      interests: ['Data Science', 'Machine Learning', 'Big Data'],
      experience: 4,
      maritalStatus: 'single',
      nationality: 'Canada',
      languagesKnown: ['English', 'French', 'Spanish'],
      currentLocation: 'Toronto',
      lastJobExperience: 'Data Analyst at Analytics Corp',
      lastDesignation: 'Data Scientist',
      department: 'it',
      reasonForLeaving: 'Better opportunity'
    }
  };

  getMockJobs(): Job[] {
    return this.mockJobs;
  }

  getEmployeeProfile(userId: string): Observable<EmployeeRegister> {
    const profile = this.mockProfiles[userId];
    if (profile) {
      return of(profile);
    }
    throw new Error('Profile not found');
  }

  updateEmployeeProfile(userId: string, data: Partial<EmployeeRegister>): Observable<EmployeeRegister> {
    const profile = this.mockProfiles[userId];
    if (profile) {
      this.mockProfiles[userId] = { ...profile, ...data };
      return of(this.mockProfiles[userId]);
    }
    throw new Error('Profile not found');
  }
} 
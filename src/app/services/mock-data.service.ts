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
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Looking for an experienced Frontend Developer to join our team...',
      requirements: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript'],
      salary: '$120,000 - $150,000',
      postedDate: new Date('2024-03-15'),
      deadline: new Date('2024-04-15')
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      company: 'Digital Innovations',
      location: 'Remote',
      type: 'Contract',
      description: 'Seeking a talented UI/UX Designer for a 6-month contract...',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      salary: '$80,000 - $100,000',
      postedDate: new Date('2024-03-14'),
      deadline: new Date('2024-04-14')
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Data Analytics Co.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Join our data science team to work on cutting-edge projects...',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Data Analysis'],
      salary: '$130,000 - $160,000',
      postedDate: new Date('2024-03-13'),
      deadline: new Date('2024-04-13')
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Seattle, WA',
      type: 'Full-time',
      description: 'Looking for a DevOps Engineer to help us scale our infrastructure...',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      salary: '$110,000 - $140,000',
      postedDate: new Date('2024-03-12'),
      deadline: new Date('2024-04-12')
    },
    {
      id: '5',
      title: 'iOS Developer',
      company: 'Mobile Apps Ltd',
      location: 'Los Angeles, CA',
      type: 'Part-time',
      description: 'Seeking an iOS Developer for our mobile app development team...',
      requirements: ['Swift', 'iOS', 'Xcode', 'REST APIs'],
      salary: '$90,000 - $120,000',
      postedDate: new Date('2024-03-11'),
      deadline: new Date('2024-04-11')
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
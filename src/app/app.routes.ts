import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { JobListComponent } from './components/jobs/job-list/job-list.component';
import { JobDetailComponent } from './components/jobs/job-detail/job-detail.component';
import { JobPostComponent } from './components/jobs/job-post/job-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecruiterDashboardComponent } from './components/profile/recruiter-dashboard/recruiter-dashboard.component';
import { JobSeekerDashboardComponent } from './components/profile/job-seeker-dashboard/job-seeker-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RoleGuard],
    children: [
      { path: 'recruiter', component: RecruiterDashboardComponent },
      { path: 'jobseeker', component: JobSeekerDashboardComponent }
    ]
  },
  {
    path: 'post-job',
    component: JobPostComponent,
    canActivate: [RoleGuard]
  }
]; 
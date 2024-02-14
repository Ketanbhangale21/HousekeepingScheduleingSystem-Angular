import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/Services/auth.gaurd';
import { StudentRequestsComponent } from './components/StudentComponents/student-requests/student-requests.component';
import { RequestStatusComponent } from './components/StudentComponents/request-status/request-status.component';
import { StudentProfileComponent } from './components/StudentComponents/student-profile/student-profile.component';
import { StudentFeedbackComponent } from './components/StudentComponents/student-feedback/student-feedback.component';
import { RequestsComponent } from './components/AdminComponents/requests/requests.component';
import { HousekeepersComponent } from './components/AdminComponents/housekeepers/housekeepers.component';
import { HouskeeperRegistrationComponent } from './components/AdminComponents/houskeeper-registration/houskeeper-registration.component';
import { StudentsComponent } from './components/AdminComponents/students/students.component';
import { FeedbacksComponent } from './components/AdminComponents/feedbacks/feedbacks.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'studentregistration',
    component: StudentRegistrationComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentRequestsComponent } from './components/StudentComponents/student-requests/student-requests.component';
import { RequestStatusComponent } from './components/StudentComponents/request-status/request-status.component';
import { StudentProfileComponent } from './components/StudentComponents/student-profile/student-profile.component';
import { StudentFeedbackComponent } from './components/StudentComponents/student-feedback/student-feedback.component';
import { RequestsComponent } from './components/AdminComponents/requests/requests.component';
import { HousekeepersComponent } from './components/AdminComponents/housekeepers/housekeepers.component';
import { StudentsComponent } from './components/AdminComponents/students/students.component';
import { FeedbacksComponent } from './components/AdminComponents/feedbacks/feedbacks.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, StudentRegistrationComponent, ForgotPasswordComponent, DashboardComponent, StudentRequestsComponent, RequestStatusComponent, StudentProfileComponent, StudentFeedbackComponent, RequestsComponent, HousekeepersComponent, StudentsComponent, FeedbacksComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

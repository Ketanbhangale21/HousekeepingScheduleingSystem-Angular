import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent {
  constructor(private http: HttpClient, private router: Router) {}

  userData: any[] = [];
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  phoneNumber: string = '';
  gender: string = '';
  password: string = '';
  repassword: string = '';
  secquestion: string = '';
  answer: string = '';
  showPassword: boolean = false;
  showRePassword: boolean = false;
  errors: string = '';

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleRePasswordVisibility(): void {
    this.showRePassword = !this.showRePassword;
  }

  securityQuestions: string[] = [
    "What is your mother's maiden name?",
    'What is the name of your first pet?',
    'What is your favorite movie?',
    'What city were you born in?',
    'What is the name of your elementary school?',
  ];

  isValid(): boolean {
    // Implement validation logic here
    return true;
  }

  handleRegistration(): void {
    // Implement registration logic here
  }
}

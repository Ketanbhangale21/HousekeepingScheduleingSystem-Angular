import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../Services/students.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private router: Router,
    private studentService: StudentsService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (data) => (this.userData = data),
      (error) => console.error(error)
    );
  }
  email: string = '';
  password: string = '';
  updatedPassword: any = {};
  errorField: any;
  secquestion: string = '';
  answer: string = '';
  userData: any[] = [];
  showPassword: boolean = false;
  securityQuestions: string[] = [
    "What is your mother's maiden name?",
    'What is the name of your first pet?',
    'What is your favorite movie?',
    'What city were you born in?',
    'What is the name of your elementary school?',
  ];
  async intializeNewPassword(): Promise<void> {
    this.updatedPassword = {
      email: this.email,
      password: this.password,
    };
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (!this.email || !this.secquestion || !this.answer) {
      this.errorField = 'Please fill out all fields.';
      return;
    }
    this.idCheck(this.email);
  }
  clearError() {
    this.errorField = '';
  }
  async idCheck(email: string): Promise<void> {
    const user = this.userData.find(
      (user) => user.email === email.toLowerCase()
    );
    if (!user) {
      this.errorField = 'Unregistered Email Id';
      return;
    }
    if (this.secquestion !== '') {
      if (user.secquestion === this.secquestion) {
        if (user.secanswer === this.answer) {
          const isValidPassword = this.isPasswordValid(this.password);
          if (!isValidPassword.valid) {
            this.errorField = isValidPassword.error;
            return;
          } else {
            this.errorField = '';
            const dataObj = {
              email: this.email,
              password: this.password,
            };
            await this.intializeNewPassword();
            console.log(this.updatedPassword);
            this.studentService.updatePassword(this.updatedPassword).subscribe(
              (response) => {
                // Handle successful response here
                console.log('PUT request successful:', response);
              },
              (error) => {
                // Handle error response here
                console.error('PUT request error:', error);
              }
            );
            alert('Password Updated Successfully');
            this.router.navigate(['/login']);
          }
        } else {
          this.errorField = 'Incorrect Answer';
        }
      } else {
        this.errorField = 'Please Select Correct Question !!';
      }
    } else {
      this.errorField = 'Please Select a Question ';
    }
  }

  isPasswordValid(password: string): { valid: boolean; error?: string } {
    if (password.length < 8) {
      return {
        valid: false,
        error: 'Password should contain at least 8 characters',
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        error: 'Password should contain at least 1 uppercase letter',
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        error: 'Password should contain at least 1 lowercase letter',
      };
    }
    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: 'Password should contain at least 1 digit',
      };
    }
    if (!/[\W_]/.test(password)) {
      return {
        valid: false,
        error: 'Password should contain at least 1 special character',
      };
    }
    return { valid: true };
  }
}

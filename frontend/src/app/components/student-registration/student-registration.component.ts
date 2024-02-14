import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../Services/students.service';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent {
  constructor(
    private router: Router,
    private studentService: StudentsService
  ) {}
  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (data) => (this.userData = data),
      (error) => console.error(error)
    );
  }
  userData: any[] = [];
  newStudent: any = {};
  stdid: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  phoneNumber: string = '';
  gender: string = '';
  roomno: number = 0;
  floorno: number = 0;
  password: string = '';
  repassword: string = '';
  secquestion: string = '';
  answer: string = '';
  showPassword: boolean = false;
  showRePassword: boolean = false;
  errorsFields: any;

  async intializeNewStudent(): Promise<void> {
    this.newStudent = {
      stdid: await this.generateStdId(),
      fname: this.firstName,
      lname: this.lastName,
      email: this.email,
      country: this.country,
      state: this.state,
      city: this.city,
      phone: this.phoneNumber,
      gender: this.gender,
      password: this.password,
      secquestion: this.secquestion,
      secanswer: this.answer,
      roomno: await this.generateRoomNo(),
      floorno: await this.generateFloorNo(),
      reqid: [],
    };
    console.log(this.newStudent);
  }
  async generateStdId(): Promise<string> {
    return 'ST' + Math.floor(100000 + Math.random() * 900000);
  }

  async generateFloorNo(): Promise<number> {
    return Math.floor(Math.random() * 5) + 1;
  }

  async generateRoomNo(): Promise<number> {
    return Math.floor(Math.random() * 10) + 1;
  }
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
  clearError() {
    this.errorsFields = '';
  }
  isEmailValid(email: string): boolean {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailValidation.test(email);
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

  isValid(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repassword: string,
    secquestion: string,
    answer: string,
    gender: string,
    userData: any[]
  ) {
    const user = userData.find((user) => user.email === email.toLowerCase());
    // console.log(user);
    const isValidPassword = this.isPasswordValid(password);
    if (!firstName || !lastName) {
      return 'Firstname and Lastname are required.';
    }
    if (!email || !password || !repassword) {
      return 'Email and Password are required.';
    }

    if (!this.isEmailValid(email)) {
      return 'Invalid Email Id';
    }
    if (user) {
      return 'This Email id is already registered !!';
    }
    if (!isValidPassword.valid) {
      return isValidPassword.error;
    }
    if (password !== repassword) {
      return 'Passwords should match';
    }
    if (secquestion === '') {
      return 'Please choose a security question';
    }
    if (answer === '') {
      return 'Please provide an answer for security question';
    }
    if (gender === '') {
      return 'Please choose a Gender';
    }
    return true; // Validation passed
  }
  async handleRegistration(): Promise<void> {
    // Implement registration logic here
    this.errorsFields = this.isValid(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.repassword,
      this.secquestion,
      this.answer,
      this.gender,
      this.userData
    );
    // console.log(this.errorsFields);
    await this.intializeNewStudent();
    if (this.errorsFields === true) {
      console.log(this.newStudent);
      this.studentService.addStudent(this.newStudent).subscribe(
        (data) => (this.userData = data),
        (error) => console.error(error)
      );
      alert('User registered successfully');
      this.router.navigate(['/login']);
    }
  }
}

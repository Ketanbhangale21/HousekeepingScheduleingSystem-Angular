import { Component } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { AuthService } from '../Services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  fname: string = '';
  password: string = '';
  errorField: string = '';
  userData: any[] = [];
  showPassword: boolean = false;
  constructor(
    private studentService: StudentsService,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  ngOnInit() {}
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  async handleLogin(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorField = 'Email or password cannot be empty';
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.errorField = 'Invalid email-id';
      return;
    }
    const loginData = { email: this.email, password: this.password };
    console.log(loginData);
    this.http.post<any>('http://localhost:3005/api/login', loginData).subscribe(
      (response) => {
        if (response && response.message === 'Login successful') {
          console.log('Login successful');
          this.errorField = response.message;
          this.authService.login(this.email);
        } else {
          this.errorField = response.error;
          // console.error('Login failed:', response.error);
        }
      },
      (error) => {
        // console.error('Error during login:', error);
      }
    );
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  }

  handleEmailChange(event: any): void {
    this.email = event.target.value;
    this.errorField = '';
  }

  handlePasswordChange(event: any): void {
    this.password = event.target.value;
    this.errorField = '';
  }
}

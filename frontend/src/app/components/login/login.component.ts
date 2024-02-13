import { Component } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { AuthService } from '../Services/auth.service';

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
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.studentService.getStudents().subscribe(
      (data) => (this.userData = data),
      (error) => console.error(error)
    );
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  handleLogin(): void {
    if (!this.email || !this.password) {
      this.errorField = 'Email or password cannot be empty';
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.errorField = 'Invalid email-id';
      return;
    }
    const user = this.userData.find(
      (user) => user.email === this.email.toLowerCase()
    );
    if (!user) {
      this.errorField = 'Unregistered Email Id';
      return;
    }
    if (user.password === this.password) {
      this.authService.login(this.email, user.fname, user.stdid);
    } else {
      this.errorField = 'Incorrect Password, please try again.';
    }
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

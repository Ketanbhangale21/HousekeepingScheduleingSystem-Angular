import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorField: string = '';
  userData: any[] = [];
  showPassword: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

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

    // Implement login logic here
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

  async fetchData(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:3005/api/students');
      this.userData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

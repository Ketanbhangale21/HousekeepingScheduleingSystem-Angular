// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  login(email: string, userName: string, stdid: string): void {
    if (email === 'admin@example.com') {
      sessionStorage.setItem('UserType', 'Admin');
    } else {
      sessionStorage.setItem('UserEmail', email);
      sessionStorage.setItem('UserId', stdid);
      sessionStorage.setItem('UserName', userName);
      sessionStorage.setItem('UserType', 'Student');
    }

    let returnUrl = this.getReturnUrl();
    let token = 'ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS';
    sessionStorage.setItem('user-token', token);

    // Navigate to the returnUrl
    this.router.navigate([returnUrl]);
  }

  private getReturnUrl(): string {
    const queryString = location.search; // returns the query string from the current url
    let returnUrl = new URLSearchParams(queryString).get('returnUrl');
    return returnUrl || '/dashboard';
  }
}

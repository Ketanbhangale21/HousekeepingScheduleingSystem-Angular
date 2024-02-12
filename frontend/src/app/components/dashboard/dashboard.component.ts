// dashboard.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  prop1 = sessionStorage.getItem('UserType');
  name = sessionStorage.getItem('UserName');
  userEmail: string = '';
  route: string = 'dashboard';

  constructor() {}

  ngOnInit(): void {
    // this.prop1 = sessionStorage.getItem('UserType') || '';
    // this.userEmail = sessionStorage.getItem('UserEmail') || '';
    // this.name = sessionStorage.getItem('UserName') || '';
  }

  handleRoutes(route: string): void {
    this.route = route;
  }

  login(): void {
    sessionStorage.clear();
    window.location.href = '/'; // Redirect to login page
  }
}

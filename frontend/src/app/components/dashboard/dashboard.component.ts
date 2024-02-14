// dashboard.component.ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  prop1: any;
  name: any;
  userEmail: string = '';
  route: string = 'dashboard';
  stdid: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.prop1 = sessionStorage.getItem('UserType') || '';
    this.userEmail = sessionStorage.getItem('UserEmail') || '';
    this.fetchStudentDetails();
  }
  fetchStudentDetails(): void {
    this.http.get<any[]>('http://localhost:3005/api/students').subscribe(
      (response) => {
        const userEmail = sessionStorage.getItem('UserEmail');
        const selectedStudent = response.filter(
          (student) => student.email === userEmail
        );
        this.stdid = selectedStudent[0].stdid;
        this.name = selectedStudent[0].fname;
        sessionStorage.setItem('UserId', this.stdid);
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
  handleRoutes(route: string): void {
    this.route = route;
  }

  login(): void {
    sessionStorage.clear();
    window.location.href = '/'; // Redirect to login page
  }
}

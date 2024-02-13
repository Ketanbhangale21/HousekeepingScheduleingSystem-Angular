import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
})
export class StudentProfileComponent {
  studentDetails: any = null;
  selectedStudent: any = null;
  details: boolean = false;
  editable: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    this.http.get<any[]>('http://localhost:3005/api/students').subscribe(
      (response) => {
        const userEmail = sessionStorage.getItem('UserEmail');
        const filteredStudents = response.filter(
          (student) => student.email === userEmail
        );
        this.selectedStudent = filteredStudents[0];
        this.studentDetails = filteredStudents[0];
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  handleUpdate(): void {
    console.log(this.selectedStudent.stdid);
    this.editable = !this.editable;
    const updatedStudent = {
      ...this.selectedStudent,
      stdid: this.selectedStudent.stdid,
      fname: (document.getElementById('fname') as HTMLInputElement).value,
      lname: (document.getElementById('lname') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      country: (document.getElementById('country') as HTMLInputElement).value,
      state: (document.getElementById('state') as HTMLInputElement).value,
      city: (document.getElementById('city') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      gender: (document.getElementById('gender') as HTMLInputElement).value,
    };
    console.log(updatedStudent);
    this.http
      .put('http://localhost:3005/api/students', updatedStudent)
      .subscribe(
        () => {
          alert('Updated');
          this.studentDetails = updatedStudent;
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
  }

  handleBack(): void {
    this.editable = false;
  }

  editSelected(): void {
    this.editable = true;
  }
}

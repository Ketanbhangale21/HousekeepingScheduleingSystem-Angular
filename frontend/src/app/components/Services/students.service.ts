// student.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any> {
    return this.http.get<any>('http://localhost:3005/api/students/all');
  }

  // Get student by ID
  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3005/api/students/${id}`);
  }

  // Add a new student
  loginUser(studentData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3005/api/login', studentData);
  }
  // Add a new student
  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3005/api/students',
      studentData
    );
  }

  // Update student
  updateStudent(id: number, updatedStudentData: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3005/api/students/${id}`,
      updatedStudentData
    );
  }
  // Update Password
  updatePassword(dataobj: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3005/api/students/reset`,
      dataobj
    );
  }

  // Delete student
  // deleteStudent(id: number): Observable<any> {
  //   return this.http.delete<any>(`http://localhost:3005/api/students/${id}`);
  // }
}

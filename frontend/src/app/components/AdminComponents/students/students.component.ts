// Import necessary Angular modules and services
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  trackByStudent(index: number, student: any): string {
    return student._id; // Assuming _id is a unique identifier for each student
  }

  fetchStudents(): void {
    this.http.get<any[]>('http://localhost:3005/api/students').subscribe(
      (response) => {
        const sortedStudents = response.sort((a, b) => a.stdid - b.stdid);
        this.students = sortedStudents;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  get currentRecords(): any[] {
    const indexOfLastRecord = this.currentPage * this.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.recordsPerPage;
    return this.students.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get totalPages(): number {
    return Math.ceil(this.students.length / this.recordsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}

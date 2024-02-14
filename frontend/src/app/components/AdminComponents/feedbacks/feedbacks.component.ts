import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
})
export class FeedbacksComponent {
  feedbacks: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(): void {
    this.http.get<any[]>('http://localhost:3005/api/feedbacks').subscribe(
      (response) => {
        this.feedbacks = response;
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    );
  }

  get currentRecords(): any[] {
    const indexOfLastRecord = this.currentPage * this.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.recordsPerPage;
    return this.feedbacks.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get totalPages(): number {
    return Math.ceil(this.feedbacks.length / this.recordsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}

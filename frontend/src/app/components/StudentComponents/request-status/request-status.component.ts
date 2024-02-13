import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css'],
})
export class RequestStatusComponent implements OnInit {
  userEmail: any = sessionStorage.getItem('UserEmail');
  requests: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 4;
  stdid: any = sessionStorage.getItem('UserId');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRequests();
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Allocated':
        return 'text-primary';
      case 'Completed':
        return 'text-success';
      default:
        return 'text-default';
    }
  }

  async fetchRequests(): Promise<void> {
    try {
      const id = this.stdid;
      const response: any = await this.http
        .get('http://localhost:3005/api/requests')
        .toPromise();
      this.requests = response.filter((item: any) => item.stdid === id);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  get indexOfLastRecord(): number {
    return this.currentPage * this.recordsPerPage;
  }

  get indexOfFirstRecord(): number {
    return this.indexOfLastRecord - this.recordsPerPage;
  }

  get currentRecords(): any[] {
    return this.requests.slice(this.indexOfFirstRecord, this.indexOfLastRecord);
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  get totalPages(): number {
    return Math.ceil(this.requests.length / this.recordsPerPage);
  }
}

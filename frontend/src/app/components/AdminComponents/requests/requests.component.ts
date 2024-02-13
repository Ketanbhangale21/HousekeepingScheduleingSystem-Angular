import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
  requests: any[] = [];
  currentPage: number = 1;
  recordsPerPage: number = 4;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any[]>('http://localhost:3005/api/requests').subscribe(
      (response) => {
        const requestData = response;
        const incompleteRequests = requestData.filter(
          (request) => request.status !== 'Completed'
        );
        const requestsArray = Object.values(incompleteRequests);
        const flattenedRequests = requestsArray.flat();
        this.requests = flattenedRequests;
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  allocateHousekeeperToRequest(reqid: string): void {
    this.http.get<any[]>('http://localhost:3005/api/staff').subscribe(
      (response) => {
        const housekeepersData = response;
        const inactiveHousekeeper = housekeepersData.find(
          (housekeeper) => housekeeper.status === 'Inactive'
        );
        if (inactiveHousekeeper) {
          this.http
            .put(`http://localhost:3005/api/requests/admin/${reqid}`, {
              status: 'Allocated',
              hid: inactiveHousekeeper.hid,
            })
            .subscribe(() => {
              this.http
                .put(
                  `http://localhost:3005/api/staff/allocate/${inactiveHousekeeper.hid}`,
                  {
                    reqid: reqid,
                    status: 'Active',
                  }
                )
                .subscribe(() => {
                  alert('Housekeeper allocated successfully');
                  this.fetchData();
                });
            });
        } else {
          alert('No inactive housekeeper available for allocation');
        }
      },
      (error) => {
        console.error('Error allocating housekeeper to request:', error);
      }
    );
  }

  completeRequest(reqid: string): void {
    this.http
      .get<any[]>(`http://localhost:3005/api/requests/admin/${reqid}`)
      .subscribe(
        (response: any) => {
          const hid = response.hid;

          this.http
            .put(`http://localhost:3005/api/staff/complete/${hid}`, {
              status: 'Inactive',
            })
            .subscribe(() => {
              this.http
                .put(`http://localhost:3005/api/requests/admin/${reqid}`, {
                  status: 'Completed',
                })
                .subscribe(() => {
                  alert('Request completed successfully');
                  this.fetchData();
                });
            });
        },
        (error) => {
          console.error('Error completing request:', error);
        }
      );
  }

  get currentRecords(): any[] {
    const indexOfLastRecord = this.currentPage * this.recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - this.recordsPerPage;
    return this.requests.slice(indexOfFirstRecord, indexOfLastRecord);
  }

  handlePageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get totalPages(): number {
    return Math.ceil(this.requests.length / this.recordsPerPage);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}

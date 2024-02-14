import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-housekeepers',
  templateUrl: './housekeepers.component.html',
  styleUrl: './housekeepers.component.css',
})
export class HousekeepersComponent {
  housekeepers: any[] = [];
  selectedHousekeeper: any = null;
  details: boolean = false;
  editable: boolean = false;
  currentPage: number = 1;
  recordsPerPage: number = 5;
  indexOfLastRecord: number = this.currentPage * this.recordsPerPage;
  indexOfFirstRecord: number = this.indexOfLastRecord - this.recordsPerPage;
  currentRecords: any[] = [];

  //totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchHousekeepers();
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
    console.log(this.housekeepers);
  }

  trackByFn(index: number, item: any): any {
    return item._id; // or any other unique identifier in your housekeeper object
  }
  get totalPages() {
    return Math.ceil(this.housekeepers.length / this.recordsPerPage);
  }

  async fetchHousekeepers(): Promise<void> {
    this.http.get<any[]>('http://localhost:3005/api/staff').subscribe(
      (response) => {
        const sortedHousekeepers = response.sort((a, b) => a.hid - b.hid);
        this.housekeepers = sortedHousekeepers;
        this.updateCurrentRecords();
      },
      (error) => {
        console.error('Error fetching housekeepers:', error);
      }
    );
  }

  updateCurrentRecords() {
    this.indexOfLastRecord = this.currentPage * this.recordsPerPage;
    this.indexOfFirstRecord = this.indexOfLastRecord - this.recordsPerPage;
    this.currentRecords = this.housekeepers.slice(
      this.indexOfFirstRecord,
      this.indexOfLastRecord
    );
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    // console.log(pageNumber);
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  handleUpdate() {
    this.editable = !this.editable;
    // Perform update operation with edited housekeeper data
    const updatedHousekeeper = {
      ...this.selectedHousekeeper,
      hid: this.selectedHousekeeper.hid,
      fname: (document.getElementById('fname') as HTMLInputElement).value,
      lname: (document.getElementById('lname') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      country: (document.getElementById('country') as HTMLInputElement).value,
      state: (document.getElementById('state') as HTMLInputElement).value,
      city: (document.getElementById('city') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      gender: (document.getElementById('gender') as HTMLInputElement).value,
    };

    this.http
      .put('http://localhost:3005/api/staff/', updatedHousekeeper)
      .subscribe(
        (resData) => {
          alert('updated');
        },
        (error) => {
          console.error('Error updating housekeeper:', error);
        }
      );

    this.selectedHousekeeper = updatedHousekeeper;
  }

  handleDelete(id: number) {
    const confirmed = window.confirm('Do you want to delete this housekeeper?');
    if (confirmed) {
      this.http
        .delete(`http://localhost:3005/api/staff/remove/${id}`)
        .subscribe(
          () => {
            this.housekeepers = this.housekeepers.filter(
              (housekeeper) => housekeeper.hid !== id
            );
            this.updateCurrentRecords();
          },
          (error) => {
            console.error('Error deleting housekeeper:', error);
          }
        );
    }
  }

  handleView(housekeeper: any) {
    this.details = !this.details;
    this.selectedHousekeeper = housekeeper;
  }

  handleBack() {
    this.details = !this.details;
  }

  editSelected() {
    this.editable = true;
  }
  handleCancel() {
    this.editable = false;
  }
}

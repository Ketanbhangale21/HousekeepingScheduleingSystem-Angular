import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'path';
import { RequestService } from '../../Services/requests.service';

@Component({
  selector: 'app-student-requests',
  templateUrl: './student-requests.component.html',
  styleUrl: './student-requests.component.css',
})
export class StudentRequestsComponent {
  errors: string = '';
  stdid: any;
  studentEmail: any;
  timeSlots: any;
  requestDetails: any = {
    date: new Date(),
    selectedTime: '',
    requestTypes: [],
  };
  requestOptions: string[] = [
    'Mopping',
    'Dusting',
    'Cleaning',
    'Sweeping',
    'Washroom Cleaning',
    'Bed Cleaning',
  ];

  constructor(
    private http: HttpClient,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.studentEmail = sessionStorage.getItem('UserEmail');
    this.stdid = sessionStorage.getItem('UserId');
    this.generateTimeCells();
    console.log(this.stdid);
  }

  async generateUniqueID(): Promise<string> {
    return 'RQ' + Math.floor(100000 + Math.random() * 900000);
  }

  handleDateChange(date: Date): void {
    // console.log(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const dateObject = this.requestDetails.date;
    const { year, month, day } = dateObject;
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      'en-US',
      options
    );
    this.requestDetails.date = formattedDate;
    // console.log(formattedDate);
  }
  generateTimeCells(): void {
    const startTime = 9;
    const endTime = 17;
    const timeSlots = [];

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute of ['00', '30']) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const fh = hour % 12 || 12;
        const timeSlot = `${fh}:${minute} ${period}`;
        timeSlots.push(timeSlot);
      }
    }

    this.timeSlots = timeSlots;
  }

  handleTimeClick(selectedTime: string): void {
    this.requestDetails.selectedTime = selectedTime;
  }

  handleChange(event: any, name: string, value: string): void {
    if (name === 'requestType') {
      if (event.target.checked) {
        this.requestDetails.requestTypes.push(value);
      } else {
        this.requestDetails.requestTypes =
          this.requestDetails.requestTypes.filter(
            (type: string) => type !== value
          );
      }
    } else if (name === 'selectAll') {
      this.requestDetails.requestTypes = event.target.checked
        ? this.requestOptions.slice()
        : [];
    } else {
      this.requestDetails[name] = value;
    }
  }
  trackByFn(index: number, option: string): string {
    return option; // or return unique identifier if available
  }

  async handleFeedback(): Promise<void> {
    try {
      if (
        !this.requestDetails.date ||
        !this.requestDetails.selectedTime ||
        !this.requestDetails.requestTypes.length
      ) {
        this.errors = 'Please Select Date, Time, and Requests from above';
        return;
      }
      const newID = await this.generateUniqueID();
      const dataObj: any = {
        reqid: newID,
        date: this.requestDetails.date,
        timings: this.requestDetails.selectedTime,
        reqs: this.requestDetails.requestTypes,
        status: 'Created',
        stdid: this.stdid,
      };
      // Make HTTP POST request to create a new request
      await this.requestService.createRequest(dataObj);
      console.log(dataObj);
      // Make HTTP PUT request to update student request
      await this.requestService.updateStudentRequest(this.stdid, dataObj);

      console.log(this.requestDetails);
      alert('Request created Successfully');
    } catch (error) {
      console.error('Error creating request:', error);
    }
  }
}

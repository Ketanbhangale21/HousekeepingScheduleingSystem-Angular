import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.css',
})
export class StudentFeedbackComponent {
  requestIds: string[] = [];
  selectedReqId: string = '';
  stdid: any = sessionStorage.getItem('UserId');
  housekeeperName: string = '';
  housekeeperID: string = '';
  feedback: string = '';
  studentEmail: string = '';
  errorsField: string = '';
  rating: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRequestIds();
    if (this.selectedReqId) {
      this.fetchHousekeeperDetails();
    }
  }
  handleOptionchange() {
    this.fetchHousekeeperDetails();
  }

  async fetchRequestIds(): Promise<void> {
    try {
      this.studentEmail = sessionStorage.getItem('UserEmail') || '';
      const response: any = await this.http
        .get('http://localhost:3005/api/students')
        .toPromise();
      const userData: any = response.filter(
        (user: any) => user.email === this.studentEmail
      );
      if (userData.length > 0) {
        const userRequestIds = await userData
          .map((user: any) => user.reqid)
          .flat();
        this.requestIds = userRequestIds;
        // console.log(this.requestIds);
      }
    } catch (error) {
      console.error('Error fetching request IDs:', error);
    }
  }
  async fetchHousekeeperDetails(): Promise<void> {
    try {
      // console.log(this.selectedReqId);
      if (this.selectedReqId) {
        const response: any = await this.http
          .get('http://localhost:3005/api/staff')
          .toPromise();
        const fildata = response.filter(
          (user: any) =>
            user.reqid &&
            user.reqid.some((id: any) => id === this.selectedReqId)
        );
        if (fildata) {
          fildata.forEach((dataItem: any) => {
            this.housekeeperName = `${dataItem.fname} ${dataItem.lname}`;
            this.housekeeperID = dataItem.hid;
            // console.log(this.housekeeperID);
          });
        }
        if (!fildata) {
          this.housekeeperName = '';
          this.housekeeperID = '';
          console.log(fildata);
        }
      } else {
        this.housekeeperName = '';
        this.housekeeperID = '';
      }
    } catch (error) {
      console.error('Error fetching housekeeper details:', error);
    }
  }
  onChange() {
    this.errorsField = '';
  }
  handleSubmit(event: any): void {
    event.preventDefault();
    if (!this.feedback || !this.housekeeperID) {
      this.errorsField = 'All fields are mandatory';
      return;
    }

    const feedbackData = {
      reqid: this.selectedReqId,
      hname: this.housekeeperName,
      hid: this.housekeeperID,
      rating: this.rating,
      feedback: this.feedback,
      stdid: this.stdid,
    };
    // console.log(feedbackData);
    this.http
      .post('http://localhost:3005/api/feedbacks', feedbackData)
      .subscribe(
        (response: any) => {
          alert('Feedback submitted successfully!');
          this.selectedReqId = '';
          this.feedback = '';
        },
        (error: any) => {
          console.error('Error submitting feedback:', error);
        }
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-houskeeper-registration',
  templateUrl: './houskeeper-registration.component.html',
  styleUrl: './houskeeper-registration.component.css',
})
export class HouskeeperRegistrationComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  country: string = '';
  state: string = '';
  city: string = '';
  phoneNumber: string = '';
  gender: string = '';
  housekeepers: any = [];
  errors: string = '';

  constructor(private http: HttpClient) {}

  clearError() {
    this.errors = '';
  }

  async generateUniqueID(): Promise<string> {
    return 'HK' + Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
  }

  async handleRegistration(): Promise<void> {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.country ||
      !this.state ||
      !this.city ||
      !this.phoneNumber ||
      !this.gender
    ) {
      this.errors = 'All fields are required';
      return;
    }

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(this.email)) {
      this.errors = 'Please enter a valid email address';
      return;
    }

    const PhoneValidation = /^\d+$/;
    if (!PhoneValidation.test(this.phoneNumber)) {
      this.errors =
        'Please enter a valid phone number (only numbers are allowed)';
      return;
    }

    try {
      const newhid = await this.generateUniqueID();
      const dataObj = {
        hid: newhid,
        fname: this.firstName,
        lname: this.lastName,
        email: this.email,
        country: this.country,
        state: this.state,
        phone: this.phoneNumber,
        city: this.city,
        gender: this.gender,
        status: 'Inactive',
        reqid: [],
      };

      await this.http
        .post<any>('http://localhost:3005/api/staff', dataObj)
        .toPromise();
      console.log(dataObj);
      alert('Record Added');

      // Reset form fields after successful registration
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.country = '';
      this.state = '';
      this.city = '';
      this.phoneNumber = '';
      this.gender = '';
      this.errors = '';
    } catch (error) {
      console.error('Error registering staff:', error);
      alert('Error registering staff. Please try again later.');
    }
  }
}

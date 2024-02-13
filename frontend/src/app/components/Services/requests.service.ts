import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  // Method to create a new request
  createRequest(dataObj: any): Promise<any> {
    return this.http
      .post<any>('http://localhost:3005/api/requests', dataObj)
      .toPromise();
  }

  // Method to update a request for a specific student
  updateStudentRequest(stdid: string, dataObj: any): Promise<any> {
    return this.http
      .put<any>(`http://localhost:3005/api/students/request/${stdid}`, dataObj)
      .toPromise();
  }
}

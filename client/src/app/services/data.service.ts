import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  
  private readonly actAPIUrl = "http://localhost:3000/api/activities/";
  private readonly formsAPIUrl = "http://localhost:3000/api/forms/";

  activities: any = [];

  //activities
  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.actAPIUrl);
  }

  addActivity(activity: any): Observable<any> {
    return this.http.post<any>(`${this.actAPIUrl}/new`, activity);
  }

  uploadImage(formData: FormData) {
    return this.http.post<{ filePath: string }>(`${this.actAPIUrl}/api/upload`, formData);
  }

  editActivity(id: string, activity: any): Observable<any> {
    return this.http.put<any>(`${this.actAPIUrl}/${id}`, activity);
  }

  deleteActivity(id: any): Observable<any> {
    return this.http.delete<any>(`${this.actAPIUrl}/${id}`);
  }

  //forms
  getForms(): Observable<any[]> {
    return this.http.get<any[]>(this.formsAPIUrl);
  }

  updateForm(id: string, updatedForm: any): Observable<any> {
    return this.http.put<any>(`${this.formsAPIUrl}/${id}`, updatedForm);
  }

  deleteForm(id: string): Observable<any> {
    return this.http.delete(`${this.formsAPIUrl}/${id}`);
  }

  submitForm(formData: any): Observable<any> {
    return this.http.post<any>(this.formsAPIUrl + 'new', formData);
  }
}

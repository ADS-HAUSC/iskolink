import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {
    this.token = this.getAuthToken();
  }
  
  private readonly APIBaseUrl = import.meta.env.NG_APP_API_BASE_URL
  private readonly actAPIUrl = `${this.APIBaseUrl}/activities/`;
  private readonly formsAPIUrl = `${this.APIBaseUrl}/forms/`;
  private token: string | null = null;

  // Initialization and Authentication. Made with <3 by Jimwel L. Valdez (jimvdz).
  initialize(): void {
    this.http.get<any>(this.APIBaseUrl).subscribe({
      next: () => console.log('Server is running.'),
      error: (err) => console.error('Failed to wake server:', err),
    });
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private refreshToken(): void {
    this.token = this.getAuthToken();
  }

  private getAuthHeaders(): HttpHeaders {
    this.refreshToken();

    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  activities: any = [];

  // Activities. Made with <3 by Jimwel L. Valdez (jimvdz).
  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.actAPIUrl);
  }

  addActivity(activity: any): Observable<any> {
    return this.http.post<any>(`${this.actAPIUrl}/new`, activity, { headers: this.getAuthHeaders() });
  }

  uploadImage(formData: FormData) {
    return this.http.post<{ filePath: string }>(`${this.APIBaseUrl}/upload`, formData, { headers: this.getAuthHeaders() });
  }

  editActivity(id: string, activity: any): Observable<any> {
    return this.http.put<any>(`${this.actAPIUrl}/${id}`, activity, { headers: this.getAuthHeaders() });
  }

  deleteActivity(id: any): Observable<any> {
    return this.http.delete<any>(`${this.actAPIUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  //forms
  getForms(): Observable<any[]> {
    return this.http.get<any[]>(this.formsAPIUrl, { headers: this.getAuthHeaders() });
  }

  updateForm(id: string, updatedForm: any): Observable<any> {
    return this.http.put<any>(`${this.formsAPIUrl}/${id}`, updatedForm, { headers: this.getAuthHeaders() });
  }

  deleteForm(id: string): Observable<any> {
    return this.http.delete(`${this.formsAPIUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  submitForm(formData: any): Observable<any> {
    return this.http.post<any>(this.formsAPIUrl + 'new', formData);
  }
}

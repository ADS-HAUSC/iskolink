import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  
  private readonly actAPIUrl = "http://localhost:3000/api/activities/";

  activities: any = [];

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.actAPIUrl);
  }

  addActivity(activity: any): Observable<any> {
    return this.http.post<any>(this.actAPIUrl, activity);
  }

  deleteActivity(id: any): Observable<any> {
    return this.http.delete<any>(`${this.actAPIUrl}/${id}`);
  }
}

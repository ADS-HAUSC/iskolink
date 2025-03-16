import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth/admin-login';
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) {}

  // Login function to send credentials to API
  login(username: string, password: string): Observable<{ success: boolean; token?: string }> {
    return this.http.post<{ success: boolean; token?: string }>(this.API_URL, { username, password })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Store JWT token in localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Check if admin is logged in
  isLoggedIn(): boolean {
    return !!this.getToken(); // Returns true if token exists
  }

  // Logout: Remove token from storage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}


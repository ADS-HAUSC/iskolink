// Auth service made with <3 by Jimwel L. Valdez (jimvdz). Copyright (c) 2025. All rights reserved.

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${import.meta.env.NG_APP_API_BASE_URL}/auth`;
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) {}

  // Login function to send credentials to API
  login(username: string, password: string): Observable<{ success: boolean; token?: string }> {
    return this.http.post<{ success: boolean; token?: string }>(`${this.API_URL}/admin-login`, { username, password })
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

  // Verify current token
  verifyToken(): Observable<any> {
    const token = this.getToken(); 
    return this.http.get(`${this.API_URL}/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Check if admin is logged in
  async isLoggedIn(): Promise<boolean> {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const response = await firstValueFrom(this.verifyToken());
      return response.valid;
    } catch (err) {
      return false;
    }
  }

  // Logout: Remove token from storage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}


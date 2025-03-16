import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the admin is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin-dashboard']); // Redirect to dashboard if logged in
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
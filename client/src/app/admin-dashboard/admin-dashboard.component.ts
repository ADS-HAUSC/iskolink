import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activities: any[] = [];

  constructor(private authService: AuthService, private router: Router, public dataService: DataService) {}

  isActivitiesActive: boolean = true;

  toggleSection(isActivities: boolean): void {
    this.isActivitiesActive = isActivities;
  }

  ngOnInit(){
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin-login']);
    }
    else {
      this.refreshActivities();
    }
  }
  
  logOut() {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }

  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data; // Update local variable
    });
  }

  addActivity(newActivity: any) {
    this.dataService.addActivity(newActivity).subscribe(() => {
      this.refreshActivities(); // Refresh after adding
    });
  }

  deleteActivity(id: any) {
    const confirmDelete = confirm("Are you sure you want to delete this activity?");

    if (confirmDelete) {
      this.dataService.deleteActivity(id).subscribe(() => {
        this.refreshActivities(); // Refresh after deleting
      });
    }
  }
}

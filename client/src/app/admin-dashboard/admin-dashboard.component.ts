import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activities: any[] = [];

  constructor(public dataService: DataService) {}

  isActivitiesActive: boolean = true;

  toggleSection(isActivities: boolean): void {
    this.isActivitiesActive = isActivities;
  }

  ngOnInit(){
    this.refreshActivities();
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
    this.dataService.deleteActivity(id).subscribe(() => {
      this.refreshActivities(); // Refresh after deleting
    });
  }
}

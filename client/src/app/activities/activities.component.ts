import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activities: any[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit(){
    this.refreshActivities();
  }

  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data; // Update local variable
    });
  }
}

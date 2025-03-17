import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  activities: any[] = [];

  constructor(public dataService: DataService, private meta: Meta, private title: Title) {
    this.title.setTitle('Activities — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Discover our latest events, community programs, and student activities at ADS-HAUSC.' });
  }

  ngOnInit(){
    this.refreshActivities();
  }

  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data; // Update local variable
    });
  }
}

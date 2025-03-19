import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';

@Component({
  selector: 'app-activities',
  standalone: false,
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements AfterViewInit {
  activities: any[] = [];

  constructor(public dataService: DataService, private meta: Meta, private title: Title) {
    this.title.setTitle('Activities — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Discover our latest events, community programs, and student activities at ADS-HAUSC.' });
  }

  @ViewChild('heroSection', { static: true }) activitiesSection!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.activitiesSection.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.inOut'
    });
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

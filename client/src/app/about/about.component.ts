import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('About Us — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Learn more about ADS-HAUSC, our mission, vision, values, and the leaders behind.' });
  } 
}
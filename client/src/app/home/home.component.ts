import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Home — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Welcome to the Association of DOST Scholars, HAU Student Chapter. Explore our activities, scholarships, and mission.' });
  }
}

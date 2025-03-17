import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-scholarship',
  standalone: false,
  templateUrl: './scholarship.component.html',
  styleUrl: './scholarship.component.css'
})
export class ScholarshipComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Scholarships — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Explore scholarship opportunities and financial aid programs for DOST scholars at HAU.' });
  }
}

import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';

@Component({
  selector: 'app-scholarship',
  standalone: false,
  templateUrl: './scholarship.component.html',
  styleUrl: './scholarship.component.css'
})
export class ScholarshipComponent implements AfterViewInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Scholarships — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Explore scholarship opportunities and financial aid programs for DOST scholars at HAU.' });
  }

  @ViewChild('heroSection', { static: true }) scholarshipSection!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.scholarshipSection.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }
}

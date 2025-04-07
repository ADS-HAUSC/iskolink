import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  constructor(private meta: Meta, private title: Title, private dataService: DataService) {
    this.title.setTitle('Home — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Welcome to the Association of DOST Scholars, HAU Student Chapter. Explore our activities, scholarships, and mission.' });
  }

  ngOnInit() {
    this.dataService.initialize();
  }

  @ViewChild('heroSection', { static: true }) homeSection!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.homeSection.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }

  smoothScrollTo(target: string) {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
}

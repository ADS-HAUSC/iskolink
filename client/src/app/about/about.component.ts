import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('About Us — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Learn more about ADS-HAUSC, our mission, vision, values, and the leaders behind.' });
  } 

  @ViewChild('heroSection', { static: true }) aboutSection!: ElementRef;
  

  ngAfterViewInit() {
    gsap.from(this.aboutSection.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }
}
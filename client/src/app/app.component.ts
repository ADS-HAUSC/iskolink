import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root', // Or your header component selector
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  private routerSubscription: Subscription | undefined;
  isMobileNavOpen = false;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    setTimeout(() => this.animateBorderOnRouteChange(), 100);
    
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.animateBorderOnRouteChange();
      });
  }
  
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  
  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    document.body.style.overflow = this.isMobileNavOpen ? 'hidden' : '';
    
    const button = document.querySelector('.mobile-nav-toggle');
    if (button) {
      if (this.isMobileNavOpen) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
  }
  
  closeMobileNav() {
    this.isMobileNavOpen = false;
    document.body.style.overflow = '';
    const button = document.querySelector('.mobile-nav-toggle');
    if (button) {
      button.classList.remove('active');
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 1024) {
      this.closeMobileNav();
    }
  }
  
  animateBorderOnRouteChange() {
    const existingBorder = document.querySelector('.header-animated-border');
    if (existingBorder) {
      existingBorder.remove();
    }
    
      const header = document.querySelector('header');
    if (header) {
      const border = document.createElement('div');
      border.className = 'header-animated-border';
      header.appendChild(border);
    }
  }
}
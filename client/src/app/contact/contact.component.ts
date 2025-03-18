import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private meta: Meta, private title: Title) {
    this.title.setTitle('Contact Us — ADS-HAUSC');
    this.meta.addTag({ name: 'description', content: 'Stay connected with ADS-HAUSC. Reach out to us for inquiries, collaborations, and partnership opportunities.' });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNum: ['', [Validators.required]],
      message: ['', Validators.required],
    });
  }

  @ViewChild('heroSection', { static: true }) contactSection!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.contactSection.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please correct the errors before submitting.');
      return;
    }

    this.isSubmitting = true;
    this.dataService.submitForm(this.contactForm.value).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert('Form submitted successfully!');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert('Failed to submit form.');
        this.isSubmitting = false;
      },
    });
  }
}

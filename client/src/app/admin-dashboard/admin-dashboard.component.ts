import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activities: any[] = [];

  constructor(private authService: AuthService, private router: Router, public dataService: DataService, private meta: Meta, private title: Title) {
    this.title.setTitle('Admin Dashboard — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Manage ADS-HAUSC activities, scholarships, and users from the admin dashboard.' });
  }

  forms: any[] = [];

  isActivitiesActive: boolean = true;
  editingActivity: any = null;
  editingForm: any = null;
  formIdToDelete: string | null = null;
  activityIdToDelete: string | null = null;
  isEditFormModalOpen: boolean = false;
  isEditActivityModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isAddModalOpen: boolean = false;
  inModal: String = '';

  addingActivity = {
    title: '', 
    img1: '', 
    img2: '', 
    img3: '',
    desc1: '',
    desc2: ''
  };


  toggleSection(isActivities: boolean): void {
    this.isActivitiesActive = isActivities;
  }

  ngOnInit(){
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin-login']);
    }
    else {
      this.refreshActivities();
      this.refreshForms();
    }
  }
  
  logOut() {
    this.authService.logout();
    this.router.navigate(['/admin-login']);

  }

  // Activities
  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data;
    });
  }

  addActivity(newActivity: any) {
    this.dataService.addActivity(newActivity).subscribe(() => {
      this.closeAddModal();
      this.refreshActivities();
    });
  }

  onFileSelected(event: any, imageField: string) {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    this.dataService.uploadImage(formData).subscribe((response: any) => {
      (this.addingActivity as any)[imageField] = response.filePath; // Store only the image path
    }, error => {
      console.error('Error uploading file:', error);
    });
  }

  deleteActivity(id: any) {
    this.dataService.deleteActivity(id).subscribe(() => {
      this.refreshActivities();
    });
  }

  // Forms
  refreshForms() {
    this.dataService.getForms().subscribe(data => {
      this.forms = data;
    });
  }

  openAddModal(form: any) {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
    this.addingActivity = {
      title: '', 
      img1: '', 
      img2: '', 
      img3: '',
      desc1: '',
      desc2: ''
    };
  }

  openEditActivityModal(activity: any) {
    this.editingActivity = { ...activity };
    this.isEditActivityModalOpen = true;
  }

  closeEditActivityModal() {
    this.isEditActivityModalOpen = false;
    this.editingActivity = null;
  }

  openEditFormModal(form: any) {
    this.editingForm = { ...form };
    this.isEditFormModalOpen = true;
  }

  closeEditFormModal() {
    this.isEditFormModalOpen = false;
    this.editingForm = null;
  }

  saveActivity() {
    if (!this.editingActivity) return;
    this.dataService.editActivity(this.editingActivity._id, this.editingActivity).subscribe(() => {
      this.refreshActivities();
      this.closeEditActivityModal();
    });
  }

  saveForm() {
    if (!this.editingActivity) return;
    this.dataService.editActivity(this.editingActivity._id, this.editingActivity).subscribe(() => {
        this.refreshForms();
        this.closeEditFormModal();
    });
}

  openDeleteModal(dataName: string, id: string) {
    this.inModal = dataName;
    console.log(this.inModal);
    if (this.inModal == "activity") {
      this.activityIdToDelete = id;
      this.isDeleteModalOpen = true;
    }

    else if (this.inModal == "form") {
      this.formIdToDelete = id;
      this.isDeleteModalOpen = true;
    }
    
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.formIdToDelete = null;
  }

  confirmDeleteForm() {
    if (!this.activityIdToDelete && !this.formIdToDelete) return;
    if (this.inModal == "activity") {
      console.log('activity');
      this.dataService.deleteActivity(this.activityIdToDelete!).subscribe(() => {
        this.refreshActivities();
        this.closeDeleteModal();
      });
    }

    else if (this.inModal == "form")
    {
      this.dataService.deleteForm(this.formIdToDelete!).subscribe(() => {
        this.refreshForms();
        this.closeDeleteModal();
      });
    }
  }
}

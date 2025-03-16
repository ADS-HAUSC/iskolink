import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activities: any[] = [];

  constructor(private authService: AuthService, private router: Router, public dataService: DataService) {}

  forms: any[] = [];

  isActivitiesActive: boolean = true;
  editingForm: any = null;
  formIdToDelete: string | null = null;
  activityIdToDelete: string | null = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  inModal: String = ''; // Activity or Form

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

  //activities
  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data;
    });
  }

  addActivity(newActivity: any) {
    this.dataService.addActivity(newActivity).subscribe(() => {
      this.refreshActivities();
    });
  }

  deleteActivity(id: any) {
    this.dataService.deleteActivity(id).subscribe(() => {
      this.refreshActivities(); // Refresh after deleting
    });
  }

  //forms
  refreshForms() {
    this.dataService.getForms().subscribe(data => {
      this.forms = data;
    });
  }

  openEditModal(form: any) {
    this.editingForm = { ...form };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingForm = null;
  }

  saveForm() {
    if (!this.editingForm) return;
    this.dataService.updateForm(this.editingForm._id, this.editingForm).subscribe(() => {
      this.refreshForms();
      this.closeEditModal();
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
        this.refreshActivities(); // Refresh after deleting
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

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
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

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

    const confirmDelete = confirm("Are you sure you want to delete this activity?");

    if (confirmDelete) {
      this.dataService.deleteActivity(id).subscribe(() => {
        this.refreshActivities(); // Refresh after deleting
      });
    }

    this.dataService.deleteActivity(id).subscribe(() => {
      this.refreshActivities();
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

  openDeleteModal(formId: string) {
    this.formIdToDelete = formId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.formIdToDelete = null;
  }

  confirmDeleteForm() {
    if (!this.formIdToDelete) return;
    this.dataService.deleteForm(this.formIdToDelete).subscribe(() => {
      this.refreshForms();
      this.closeDeleteModal();
    });
  }
}

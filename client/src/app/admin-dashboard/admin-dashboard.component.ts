import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activities: any[] = [];
  forms: any[] = [];
  isActivitiesActive: boolean = true;
  editingForm: any = null;
  formIdToDelete: string | null = null;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isAddModalOpen: boolean = false;

  constructor(public dataService: DataService) {}

  toggleSection(isActivities: boolean): void {
    this.isActivitiesActive = isActivities;
  }

  ngOnInit() {
    this.refreshActivities();
    this.refreshForms();
  }

  // Activities
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
      this.refreshActivities();
    });
  }

  // Forms
  refreshForms() {
    this.dataService.getForms().subscribe(data => {
      this.forms = data;
    });
  }

  openAddModal() {
    this.isAddModalOpen = true;
  }

  closeAddModal() {
    this.isAddModalOpen = false;
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

  confirmDelete() {
    if (!this.formIdToDelete) return;
    this.dataService.deleteForm(this.formIdToDelete).subscribe(() => {
      this.refreshForms();
      this.closeDeleteModal();
    });
  }
}

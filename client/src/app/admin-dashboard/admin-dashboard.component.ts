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
  formToEdit: any = null;
  editingForm: any = null;

  constructor(public dataService: DataService) {}

  toggleSection(isActivities: boolean): void {
    this.isActivitiesActive = isActivities;
  }

  ngOnInit(){
    this.refreshActivities();
    this.refreshForms();
  }

  //activities
  refreshActivities() {
    this.dataService.getActivities().subscribe(data => {
      this.activities = data; // Update local variable
    });
  }

  addActivity(newActivity: any) {
    this.dataService.addActivity(newActivity).subscribe(() => {
      this.refreshActivities(); // Refresh after adding
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

  editForm(form: any) {
    this.editingForm = { ...form };
  }

  saveForm() {
    if (!this.editingForm) return;
    this.dataService.updateForm(this.editingForm._id, this.editingForm).subscribe(() => {
      this.refreshForms();
      this.editingForm = null;
    });
  }

  cancelEdit() {
    this.editingForm = null;
  }

  deleteForm(id: string) {
    console.log('Deleting form with ID:', id); // Debugging
    this.dataService.deleteForm(id).subscribe(() => {
      this.refreshForms();
    });
  }
}

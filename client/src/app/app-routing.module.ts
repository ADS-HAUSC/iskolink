import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ScholarshipComponent } from './scholarship/scholarship.component';
import { ContactComponent } from './contact/contact.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : '', component : HomeComponent },
  {path : 'about', component : AboutComponent },
  {path : 'activities', component : ActivitiesComponent },
  {path : 'scholarship', component : ScholarshipComponent },
  {path : 'contact', component : ContactComponent },
  {path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
     canActivate: [authGuard] },
  {path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

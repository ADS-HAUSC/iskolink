import { NgModule } from '@angular/core';
import { RouterModule, Routes, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
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
  imports: [
    RouterModule.forRoot(routes,  {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(scroller: ViewportScroller) {
    scroller.scrollToPosition([0, 0]);
  }
}

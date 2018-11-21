import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AdminComponent } from './admin/admin.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobCreateComponent } from './job-create/job-create.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/create', component: JobCreateComponent },
  { path: 'jobs/edit/:id', component: JobEditComponent },
  { path: 'jobs/details/:id/:company', component: JobDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'my-account/settings', component: AccountSettingsComponent },
  { path: 'my-account/job-postings', component: MyAccountComponent },
  { path: '**', redirectTo: '/jobs', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

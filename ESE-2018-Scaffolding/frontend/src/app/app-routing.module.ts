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
import { CompanyListComponent } from './company-list/company-list.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AdminAllCompaniesComponent} from './admin-all-companies/admin-all-companies.component';
import {AdminAllJobsComponent} from './admin-all-jobs/admin-all-jobs.component';
import {AdminUnverifiedCompaniesComponent} from './admin-unverified-companies/admin-unverified-companies.component';
import {AdminUnacceptedJobsComponent} from './admin-unaccepted-jobs/admin-unaccepted-jobs.component';
import {CompanyDetailComponent} from './company-detail/company-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/create', component: JobCreateComponent },
  { path: 'jobs/edit/:id', component: JobEditComponent },
  { path: 'jobs/details/:id/:company', component: JobDetailComponent },
  { path: 'company/details/:id', component: CompanyDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'admin/all/companies', component: AdminAllCompaniesComponent },
  { path: 'admin/all/jobs', component: AdminAllJobsComponent },
  { path: 'admin/unverified/companies', component: AdminUnverifiedCompaniesComponent },
  { path: 'admin/unaccepted/jobs', component: AdminUnacceptedJobsComponent },
  { path: 'my-account/settings', component: AccountSettingsComponent },
  { path: 'my-account/job-postings', component: MyAccountComponent },
  { path: 'companies', component: CompanyListComponent },
  { path: '**', redirectTo: '/jobs', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

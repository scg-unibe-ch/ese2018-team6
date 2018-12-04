import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

// Add css components from angular material
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatInputModule, MatListModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {JobListComponent} from './job-list/job-list.component';
import {JobItemComponent} from './job-list/job-item/job-item.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {JobEditComponent} from './job-edit/job-edit.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {MyJobItemComponent} from './my-account/my-job-item/my-job-item.component';
import {JobCreateComponent} from './job-create/job-create.component';
import {AdminAllCompaniesComponent} from './admin-all-companies/admin-all-companies.component';
import {AdminAllJobsComponent} from './admin-all-jobs/admin-all-jobs.component';
import {AdminUnverifiedCompaniesComponent} from './admin-unverified-companies/admin-unverified-companies.component';
import {AdminUnacceptedJobsComponent} from './admin-unaccepted-jobs/admin-unaccepted-jobs.component';
import {AdminCompanyComponent} from './admin-all-companies/admin-company/admin-company.component';
import {AdminJobComponent} from './admin-all-jobs/admin-job/admin-job.component';
import {CompanyApplicationComponent} from './admin-unverified-companies/company-application/company-application.component';
import {JobSubmissionComponent} from './admin-unaccepted-jobs/job-submission/job-submission.component';

import {FormatService} from './format.service';
import {RequestService} from './request.service';
import {ToastrModule} from 'ngx-toastr';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {ValidationService} from './validation.service';
<<<<<<< HEAD
import { CompanyListComponent } from './company-list/company-list.component';
=======
import {CompanyDetailComponent} from './company-detail/company-detail.component';
>>>>>>> 032065abcc2275bfd9bbf76667edfb10f3f3a3be

@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobItemComponent,
    HeaderComponent,
    FooterComponent,
    UserLoginComponent,
    UserRegisterComponent,
    JobEditComponent,
    ContactComponent,
    AboutComponent,
    MyAccountComponent,
    JobDetailComponent,
    MyJobItemComponent,
    JobCreateComponent,
    AccountSettingsComponent,
<<<<<<< HEAD
    CompanyListComponent,
=======
    AdminAllCompaniesComponent,
    AdminAllJobsComponent,
    AdminUnverifiedCompaniesComponent,
    AdminUnacceptedJobsComponent,
    AdminCompanyComponent,
    AdminJobComponent,
    CompanyApplicationComponent,
    JobSubmissionComponent,
    CompanyDetailComponent,
>>>>>>> 032065abcc2275bfd9bbf76667edfb10f3f3a3be
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      maxOpened: 3,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),
  ],
  providers: [
    FormatService,
    RequestService,
    ValidationService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }

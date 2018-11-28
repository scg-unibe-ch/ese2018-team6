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
import {AdminComponent} from './admin/admin.component';
import {UserApplicationComponent} from './admin/user-application/user-application.component';
import {JobSubmissionComponent} from './admin/job-submission/job-submission.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {JobDetailComponent} from './job-detail/job-detail.component';
import {MyJobItemComponent} from './my-account/my-job-item/my-job-item.component';
import {JobCreateComponent} from './job-create/job-create.component';

import {FormatService} from './format.service';
import {RequestService} from './request.service';
import {ToastrModule} from 'ngx-toastr';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {ValidationService} from './validation.service';

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
    AdminComponent,
    UserApplicationComponent,
    JobSubmissionComponent,
    MyAccountComponent,
    JobDetailComponent,
    MyJobItemComponent,
    JobCreateComponent,
    AccountSettingsComponent,
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

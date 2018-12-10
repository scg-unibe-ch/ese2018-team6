import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {RequestService} from '../request.service';
import {Company} from '../company.model';
import {FormatService} from '../format.service';
import {ToastrService} from 'ngx-toastr';
import {ValidationService} from '../validation.service';
import {ErrorMessage} from '../errorMessage';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  userData: User = new User(
    null,
    null,
  );
  companyData: Company = new Company(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );
  confirmPassword: string = '';
  error: ErrorMessage = new ErrorMessage();

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    private validation: ValidationService,
    public format: FormatService
  ) { }

  /**
   *  Upon loading the component, it fetches the user and company data of the current user.
   */
  ngOnInit() {
    this.request.checkUserAccess();
    this.loadUserData();
    this.loadCompanyData();
  }

  /**
   *  Loads the user data of the current user.
   */
  loadUserData() {
    this.request.userDataLoad().subscribe(
      (instance: any) => this.userData = new User (
        instance.email,
        ''
      ));
  }

  /**
   *  Updates the user data with the currently entered values from the form fields.
   *  Requires that the data is valid or the request will not be sent.
   *  Validation requires email and password (which matches confirmed password).
   */
  updateUserData() {
    this.error = new ErrorMessage();
    if(this.isUserDataValid()){
      this.request.userDataUpdate(this.userData);
    } else {
      this.toastr.error('Invalid Input', 'User update failed');
    }
  }

  /**
   *  Deletes the current user from the database. Requires confirmation from user.
   *  Also removes any related entries such as company and job postings.
   */
  deleteUserData() {
    if(confirm('You are about to delete your account. Are you sure?')){
      this.request.userDataDelete();
    }
  }

  /**
   *  Loads the company data of the current user.
   */
  loadCompanyData() {
    this.request.companyDataLoad().subscribe(
      (instance: any) => this.companyData = new Company (
        instance.id,
        instance.companyName,
        instance.companyLogoURL,
        instance.companyStreet,
        instance.companyHouseNumber,
        instance.companyPostcode,
        instance.companyCity,
        instance.contactName,
        instance.contactEmail,
        instance.contactPhone,
        instance.companyWebsite,
        instance.companyDescription,
        instance.userId,
        instance.message,
        instance.verified,
        instance.onceVerified,
        instance.featured,
      )
    )
  }

  /**
   *  Updates the company data with the currently entered values from the form fields.
   *  Requires that the data is valid or the request will not be sent.
   *  Validation requires company name, complete address and a description.
   */
  updateCompanyData() {
    if(confirm('Are you sure that you want to save these changes?\nYou will be unverified until the admin approves your details.')) {
      this.error = new ErrorMessage();
      if(this.isCompanyDataValid()){
        this.request.companyDataUpdate(this.userData, this.companyData);
      } else {
        this.toastr.error('Invalid Input', 'Company update failed');
      }
    }
  }

  /**
   *  Checks the entered user data before submitting to backend.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}               True if valid; false otherwise
   */
  isUserDataValid() {
    let errorFree = this.validation.validateUserItem(this.userData, this.confirmPassword);

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }

  /**
   *  Checks the entered company data before submitting to backend.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}                True if valid; false otherwise.
   */
  isCompanyDataValid() {
    let errorFree = this.validation.validateCompanyItem(this.companyData);

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }
}

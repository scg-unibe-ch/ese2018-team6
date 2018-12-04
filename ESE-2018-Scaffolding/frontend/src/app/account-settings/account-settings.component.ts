import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {RequestService} from '../request.service';
import {Company} from '../company.model';
import {FormatService} from '../format.service';
import {ToastrService} from 'ngx-toastr';

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
  errorMessage: {[k: string]: any} = {};

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    public format: FormatService
  ) { }

  /**
   *  Upon loading the component, it fetches the user and company data of the current user.
   */
  ngOnInit() {
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
    this.errorMessage = {};
    if(this.checkUserData()){
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
    this.errorMessage = {};
    if(this.checkCompanyData()){
      this.request.companyDataUpdate(this.userData, this.companyData);
    } else {
      this.toastr.error('Invalid Input', 'Company update failed');
    }
  }

  /**
   *  Checks the entered user data before submitting to backend.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}               True if valid; false otherwise
   */
  checkUserData() {
    // Resets styling of all form fields
    let elements = ['email', 'password', 'confirmPassword'];
    for(let i=0; i < elements.length; i++){
      this.format.removeError(elements[i]);
    }
    let errorFree = true;

    // E-Mail cannot be empty
    if(this.format.isEmpty(this.userData.email)){
      this.format.addError("email");
      this.errorMessage.emailEmpty = true;
      errorFree = false;
    }

    // Password cannot be empty
    if(this.format.isEmpty(this.userData.password)){
      this.format.addError("password");
      this.errorMessage.passwordEmpty = true;
      errorFree = false;
    }

    // Confirm Password cannot be empty
    if(this.format.isEmpty(this.confirmPassword)){
      this.format.addError("confirmPassword");
      this.errorMessage.confirmPassword = true;
      this.errorMessage.confirmPasswordEmpty = true;
      errorFree = false;
    }

    // Password and Confirm Password must match
    if(this.userData.password != this.confirmPassword){
      this.format.addError("confirmPassword");
      this.errorMessage.confirmPassword = true;
      this.errorMessage.passwordsNotEqual = true;
      errorFree = false;
    }

    // Return validation result
    return errorFree;
  }

  /**
   *  Checks the entered company data before submitting to backend.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}                True if valid; false otherwise.
   */
  checkCompanyData() {
    // Resets styling of all form fields
    let elements = ['name', 'description', 'streetHouse', 'street', 'postcodeCity', 'postcode', 'city'];
    for(let i=0; i < elements.length; i++){
      this.format.removeError(elements[i]);
    }
    let errorFree = true;

    // Company Name cannot be empty
    if(this.format.isEmpty(this.companyData.name)){
      this.format.addError("name");
      this.errorMessage.nameEmpty = true;
      errorFree = false;
    }

    // Description cannot be empty
    if(this.format.isEmpty(this.companyData.description)){
      this.format.addError("description");
      this.errorMessage.descriptionEmpty = true;
      errorFree = false;
    }

    // Street cannot be empty
    if(this.format.isEmpty(this.companyData.street)){
      this.format.addError("streetHouse");
      this.format.addError("street");
      this.errorMessage.streetEmpty = true;
      errorFree = false;
    }

    // Postcode cannot be empty
    if(this.format.isEmpty(this.companyData.postcode.toString())){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeEmpty = true;
      errorFree = false;
    }

    // Postcode must be number between 1000 and 9999
    if(!(this.companyData.postcode>=1000 && this.companyData.postcode <= 9999)){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeNumber = true;
      errorFree = false;
    }

    // Postcode must be >= 1000
    if(this.companyData.postcode < 1000){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeLow = true;
      errorFree = false;
    }

    // Postcode must be <= 10'000
    if(this.companyData.postcode > 9999){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeHigh = true;
      errorFree = false;
    }

    // City cannot be empty
    if(this.format.isEmpty(this.companyData.city)){
      this.format.addError("postcodeCity");
      this.format.addError("city");
      this.errorMessage.cityEmpty = true;
      errorFree = false;
    }

    // Return validation result
    return errorFree;
  }
}

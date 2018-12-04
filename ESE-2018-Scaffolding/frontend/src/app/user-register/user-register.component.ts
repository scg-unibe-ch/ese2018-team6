import {Component} from '@angular/core';
import {User} from '../user.model';
import {Company} from '../company.model';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent {

  userData: User = new User (
    null,
    null
  );
  companyData: Company = new Company (
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
  userType: string = '';
  confirmPassword: string = '';
  errorMessage: {[k: string]: any} = {};

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    public format: FormatService
  ) { }

  /**
   *  Adds a new user to the database with status 'open'
   */
  onRegister() {
    this.errorMessage = {};
    if (this.isDataValid()) {
      this.request.userRegister(this.userData, this.companyData);
    } else {
      this.toastr.error('Invalid Input', 'Registration failed');
    }
  }

  /**
   *  Checks the entered user and company data before submitting to backend.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}                True if valid; false otherwise.
   */
  isDataValid(){
    // Resets styling of all form fields
    let elements = ['email', 'password', 'confirmPassword', 'name', 'description', 'streetHouse', 'street', 'postcodeCity', 'postcode', 'city'];
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
    if(this.companyData.postcode === null || this.format.isEmpty(this.companyData.postcode.toString())){
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

import {Component} from '@angular/core';
import {User} from '../user.model';
import {Company} from '../company.model';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';
import {ValidationService} from '../validation.service';
import {ErrorMessage} from '../errorMessage';

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
  error: ErrorMessage = new ErrorMessage();

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    private validation: ValidationService,
    public format: FormatService
  ) { }

  /**
   *  Adds a new user to the database with status 'open'
   */
  onRegister() {
    this.error = new ErrorMessage();
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
  isDataValid() {
    let errorFree = this.validation.validateRegistration(this.userData, this.companyData, this.confirmPassword);

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }
}

import {Component} from '@angular/core';
import {User} from '../user.model';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';
import {RequestService} from '../request.service';
import {ValidationService} from '../validation.service';
import {ErrorMessage} from '../errorMessage';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  userData: User = new User(
    null,
    null
  );
  error: ErrorMessage = new ErrorMessage();

  constructor(
    private format: FormatService,
    private toastr: ToastrService,
    private request: RequestService,
    private validation: ValidationService
  ) { }

  /**
   *  Signs in a user with the given email and password.
   */
  onSignIn() {
    this.error = new ErrorMessage();
    if(this.isUserDataValid()) {
      this.request.userLogin(this.userData);
    } else {
      this.toastr.error('Invalid Input', 'Sign In failed');
    }
  }

  /**
   *  Checks the entered user data before sending to backend.
   *  Validation requires an email and password to send request.
   *  If a value fails, user receives accurate feedback.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}              True if valid; false otherwise
   */
  isUserDataValid(){
    let errorFree = this.validation.validateUserLogin(this.userData);

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }
}

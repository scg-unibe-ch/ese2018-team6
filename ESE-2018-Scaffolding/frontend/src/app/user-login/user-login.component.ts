import {Component} from '@angular/core';
import {User} from '../user.model';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';
import {RequestService} from '../request.service';

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
  errorMessage: string;

  constructor(
    private format: FormatService,
    private toastr: ToastrService,
    private request: RequestService
  ) { }

  /**
   *  Signs in a user with the given email and password.
   */
  onSignIn() {
    if(this.isDataValid()) {
      this.request.userLogin(this.userData);
    } else {
      this.toastr.error(this.errorMessage, 'Sign In failed');
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
  isDataValid(){
    this.format.removeError('email');
    this.format.removeError('password');
    if(this.format.isEmpty(this.userData.email) && this.format.isEmpty(this.userData.password)){
      this.errorMessage = 'E-Mail and Password missing';
      this.format.addError('email');
      this.format.addError('password');
      return false;
    } else if(this.format.isEmpty(this.userData.email)){
      this.errorMessage = 'E-Mail missing';
      this.format.addError('email');
      return false;
    } else if(this.format.isEmpty(this.userData.password)){
      this.errorMessage = 'Password missing';
      this.format.addError('password');
      return false;
    }
    return true;
  }
}

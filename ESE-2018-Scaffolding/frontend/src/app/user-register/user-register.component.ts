import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userRegisterData: User = new User(
    null,
    null,
    null,
    null,
    'Company',
    null,
    null,
    null,
    null,
    null
  );
  confirmedPassword: String;
  errorTitle: String;
  errorMessage: String;
  hasErrors: Boolean = false;

  constructor() { }

  ngOnInit() { }

  // TODO Send request to backend to create new entry in user database with the provided data.
  onRegister() {
    this.checkForValidInput();
  }

  checkForValidInput() {
    // Check for matching passwords
    if(this.confirmedPassword !== this.userRegisterData.password) {
      this.hasErrors = true;
      this.errorTitle = 'Password Failed!';
      this.errorMessage = 'The two passwords do not match.';
    }
    // TODO Check user registration for valid inputs

    if(this.hasErrors){
      const element = document.getElementById('errorMessageBox');
      element.classList.toggle('errorMessageBox');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../user-login.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginData: UserLogin = new UserLogin(
    null,
    null
  );

  constructor() { }

  ngOnInit() { }

  // TODO Send the login data to the backend. Receive token if credentials are ok
  onSignIn() {
    // TODO Give feedback for failed login
  }
}

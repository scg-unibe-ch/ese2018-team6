import {Component, OnInit} from '@angular/core';
import {UserLogin} from '../user-login.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() { }

  onSignIn() {
    this.httpClient.post<any>('http://localhost:3000/user/token', {
      'email': this.userLoginData.email,
      'password': this.userLoginData.password
    }).subscribe(
      res => {
        localStorage.setItem('user-id', res.id);
        localStorage.setItem('user-token', res.token);
        this.router.navigate(['']);
      },
      err => {
        // TODO - give feedback on failed login (wrong email & password)
        console.log(err.error.message);
      }
    );
  }
}

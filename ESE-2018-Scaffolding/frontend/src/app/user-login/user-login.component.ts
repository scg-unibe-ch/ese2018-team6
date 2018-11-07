import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isAdmin: boolean;
  userData: User = new User(
    null,
    null
  );

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() { }

  onSignIn() {
    if(this.isDataValid()) {
      this.httpClient.post<any>('http://localhost:3000/user/token', {
        'email': this.userData.email,
        'password': this.userData.password
      }).subscribe(
        res => {
          localStorage.setItem('user-id', res.id);
          localStorage.setItem('user-token', res.token);
          // TODO - Improve admin verification with isVerified-request
          localStorage.setItem('isAdmin', res.isAdmin);
          this.router.navigate(['']);
        },
        err => {
          // TODO - Give useful feedback on failed login (wrong email or password)
          console.log(err.error.message);
        }
      );
    }
  }

  isDataValid(){
    // TODO - Check user inputs (email & password required)
    return true;
  }
}

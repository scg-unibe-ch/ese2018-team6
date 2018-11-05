import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() { }

  onRegister() {
    this.httpClient.post('http://localhost:3000/company', {
      'email': this.userRegisterData.email,
      'password': this.userRegisterData.password,
      'companyName': this.userRegisterData.name,
      // TODO - Add Logo link (BACKEND)
      'companyStreet': this.userRegisterData.street,
      'companyHouseNumber': 0, // TODO - Add form field
      'companyPostcode': this.userRegisterData.zipCode,
      'companyCity': this.userRegisterData.place,
      'contactName': '', // TODO - Add form field
      // TODO - Add contact email (BACKEND)
      'contactPhone': '', // TODO - Add form field
      // TODO - Add website link (BACKEND)
      'companyDescription': this.userRegisterData.description
    }).subscribe();

    this.router.navigate(['']);
  }

  // TODO - Check for valid input (email & password required etc.)
}

import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {Company} from '../company.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  confirmedPassword: string;
  userType: string = '';
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
    null
  );

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() { }

  onRegister() {
    if (this.isDataValid()) {
      this.httpClient.post('http://localhost:3000/company', {
        'email': this.userData.email,
        'password': this.userData.password,
        'companyName': this.companyData.name,
        'companyLogoURL': this.companyData.logo,
        'companyStreet': this.companyData.street,
        'companyHouseNumber': this.companyData.houseNumber,
        'companyPostcode': this.companyData.postcode,
        'companyCity': this.companyData.city,
        'contactName': this.companyData.contactName,
        'contactEmail': this.companyData.contactEmail,
        'contactPhone': this.companyData.contactPhone,
        'companyWebsite': this.companyData.website,
        'companyDescription': this.companyData.description
      }).subscribe(
        res => {
          this.router.navigate(['']);
        },
        err => {
          // TODO - Give useful feedback on failed registration (user exists already)
          console.log(err.error.message);
        }
      );
    }
  }

  isDataValid(){
    // TODO - Check user inputs (email, password, companyName required; password match; date format etc.)
    return true;
  }
}

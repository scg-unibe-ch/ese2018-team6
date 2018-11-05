import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {User} from '../user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Company} from '../company.model';
import {UserLogin} from '../user-login.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userId: string;
  userToken: string;

  confirmPassword: string;

  userData: UserLogin = new UserLogin(
    null,
    null,
  );
  companyData: Company = new Company(
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
  myJobPostings: Job[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    if(!this.checkIfLoggedIn()){
      this.router.navigate(['']);
    }

    this.userId = localStorage.getItem('user-id');
    this.userToken = localStorage.getItem('user-token');

    this.loadUserData();
    this.loadCompanyData();
    this.loadMyJobs();
  }

  checkIfLoggedIn(){
    return localStorage.getItem('user-token');
  }

  loadUserData() {
    this.userData = new UserLogin(
      '',
      ''
    )
    // TODO with currently missing GET-request
  }

  loadCompanyData() {
    this.httpClient.get('http://localhost:3000/company/' + this.userId + '/' + this.userToken).subscribe(
      (instance: any) => this.companyData = new Company(
        parseInt(this.userId),
        instance.companyName,
        '',
        instance.companyStreet,
        instance.companyHouseNumber,
        instance.companyPostcode,
        instance.companyCity,
        instance.contactName,
        '',
        instance.contactPhone,
        '',
        instance.companyDescription
      ))
  }

  loadMyJobs() {
    // TODO with currently missing GET-request
  }

  updateAccount() {
    this.httpClient.put('http://localhost:3000/user/' + this.userId + '/' + this.userToken, {
      'email': this.userData.email,
      'password': this.userData.password
    }).subscribe();
  }

  deleteAccount() {
    if(confirm('You are about to delete your account. Are you sure?')){
      this.httpClient.delete('http://localhost:3000/user/' + this.userId + '/' + this.userToken).subscribe();
      localStorage.removeItem('user-id');
      localStorage.removeItem('user-token');
      this.router.navigate(['/jobs/edit']);
    }
  }

  updateCompany() {
    this.httpClient.put('http://localhost:3000/company/' + this.userId + '/' + this.userToken, {
      'companyName': this.companyData.name,
      // TODO - Add Logo link (BACKEND)
      'companyStreet': this.companyData.street,
      'companyHouseNumber': 0, // TODO - Add form field
      'companyPostcode': this.companyData.zipCode,
      'companyCity': this.companyData.place,
      'contactName': '', // TODO - Add form field
      // TODO - Add contact email (BACKEND)
      'contactPhone': '', // TODO - Add form field
      // TODO - Add website link (BACKEND)
      'companyDescription': this.companyData.description
    }).subscribe();
  }

  editJobSubmission($event) {
    this.router.navigate(['/jobs/edit']);
  }

  deleteJobSubmission(jobId: number) {
    if(confirm('You are about to delete your job posting. Are you sure?')){
      this.httpClient.delete('http://localhost:3000/jobitem/' + jobId + '/' + this.userId + '/' + this.userToken).subscribe();
      this.loadMyJobs();
    }
  }
}

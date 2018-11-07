import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Company} from '../company.model';
import {User} from '../user.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userId: string;
  userToken: string;
  confirmPassword: string;
  userData: User = new User(
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
    null,
    null,
  );
  myJobPostings: Job[] = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkIfLoggedIn();
    this.loadUserData();
    this.loadCompanyData();
    this.loadMyJobs();
  }

  loadUserData() {
    this.getLocalStorage();
    this.httpClient.get('http://localhost:3000/user/' + this.userId + '/' + this.userToken).subscribe(
      (instance: any) => this.userData = new User (
        instance.email,
        instance.password
    ));
  }

  loadCompanyData() {
    this.getLocalStorage();
    this.httpClient.get('http://localhost:3000/company/' + this.userId + '/' + this.userToken).subscribe(
        (instance: any) => this.companyData = new Company (
          instance.id,
          instance.companyName,
          instance.companyLogoURL,
          instance.companyStreet,
          instance.companyHouseNumber,
          instance.companyPostcode,
          instance.companyCity,
          instance.contactName,
          instance.contactEmail,
          instance.contactPhone,
          instance.companyWebsite,
          instance.companyDescription,
          instance.userId,
          instance.messageFromAdmin
      ))
  }

  loadMyJobs() {
    this.getLocalStorage();
    this.httpClient.get('http://localhost:3000/jobItem/') // TODO - Wait for backend implementation; add userId and userToken
      .subscribe(
        (instances: any) => {
          this.myJobPostings = instances.map((instance) => new Job(
            instance.id,
            instance.title,
            instance.description,
            instance.skills,
            instance.datePosted,
            instance.startDate,
            instance.endDate,
            instance.validUntil,
            instance.workloadMin,
            instance.workloadMax,
            instance.firstLanguage,
            instance.secondLanguage,
            instance.street,
            instance.houseNumber,
            instance.postcode,
            instance.city,
            instance.salaryType,
            instance.salaryAmount,
            instance.companyId,
            instance.messageFromAdmin
          ))
        }
    )
  }

  updateAccount() {
    this.getLocalStorage();
    this.checkUserData();
    this.httpClient.put('http://localhost:3000/user/' + this.userId + '/' + this.userToken, {
      'email': this.userData.email,
      'password': this.userData.password
    }).subscribe(
      // TODO - Give useful feedback on updating Account
    );
  }

  checkUserData() {
    // TODO - Check if changed user data is still valid and can be updated
  }

  updateCompany() {
    this.getLocalStorage();
    this.checkCompanyData();
    this.httpClient.put('http://localhost:3000/company/' + this.userId + '/' + this.userToken, {
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
      // TODO - Give useful feedback on updating Company
    );
  }

  checkCompanyData() {
    // TODO - Check if changed company data is still valid and can be updated
  }

  deleteAccount() {
    if(confirm('You are about to delete your account. Are you sure?')){
      this.getLocalStorage();
      this.httpClient.delete('http://localhost:3000/user/' + this.userId + '/' + this.userToken).subscribe();
      localStorage.removeItem('user-id');
      localStorage.removeItem('user-token');
      localStorage.removeItem('isAdmin');
      this.router.navigate(['']);
    }
  }

  editJobSubmission(jobId: number) {
    this.router.navigate(['/jobs/edit/' + jobId]);
  }

  deleteJobSubmission(jobId: number) {
    console.log(jobId);
    if(confirm('You are about to delete your job posting. Are you sure?')){
      this.getLocalStorage();
      this.httpClient.delete('http://localhost:3000/jobitem/' + jobId + '/' + this.userId + '/' + this.userToken).subscribe();
      this.updateListings(this.myJobPostings, jobId);
    }
  }

  updateListings(array, idToDelete){
    for(let i = 0; i < array.length; i++){
      if (array[i].id == idToDelete) {
        array = array.splice(i, 1);
        break;
      }
    }
  }

  getLocalStorage() {
    this.userId = localStorage.getItem('user-id');
    this.userToken = localStorage.getItem('user-token');
  }

  checkIfLoggedIn() {
    if(!localStorage.getItem('user-token')){
      this.router.navigate(['']);
    }
  }
}

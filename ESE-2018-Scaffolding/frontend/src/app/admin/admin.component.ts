import {Component, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userId: string;
  userToken: string;
  userApplications: Company[] = [];
  jobSubmissions: Job[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.checkIfAdmin();
    this.onLoadingUserApplications();
    this.onLoadingJobSubmissions();
  }

  onLoadingUserApplications() {
    this.getLocalStorage();
    this.httpClient.get('http://localhost:3000/admin/unverifiedCompanies/' + this.userId + '/' + this.userToken)
      .subscribe(
        (instances: any) => {
          this.userApplications = instances.map((instance) => new Company(
            instance.userId,
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
            '',
            instance.verified
          ))
        }
      )
  }

  onLoadingJobSubmissions() {
    this.getLocalStorage();
    this.httpClient.get('http://localhost:3000/admin/unacceptedJobItems/' + this.userId + '/' + this.userToken)
      .subscribe(
        (instances: any) => {
          this.jobSubmissions = instances.map((instance) => new Job(
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
            '',
            instance.accepted
          ))
        }
      )
  }

  approveUserApplication(userId: number) {
    if(confirm('Are you sure you want to approve this user?')){
      this.getLocalStorage();
      this.httpClient.put('http://localhost:3000/admin/verify/' + userId + '/' + this.userId + '/' + this.userToken, {
        'verify': true
      }).subscribe();
      this.updateListings(this.userApplications, userId);
    }
  }

  denyUserApplication(userId: number) {
    let adminMessage = prompt('Reasons why the user application is denied:', '');
    if (adminMessage == null || adminMessage == '') {
    } else {
      this.getLocalStorage();
      this.httpClient.put('http://localhost:3000/admin/verify/' + userId + '/' + this.userId + '/' + this.userToken, {
        'verify': false,
        'message': adminMessage
      }).subscribe();
      this.updateListings(this.userApplications, userId);
    }
  }

  approveJobSubmission(jobId: number) {
    if(confirm('Are you sure you want to approve this job posting?')){
      this.getLocalStorage();
      this.httpClient.put('http://localhost:3000/admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
        'accept': true
      }).subscribe();
      this.updateListings(this.jobSubmissions, jobId);
    }
  }

  denyJobSubmission(jobId: number) {
    let adminMessage = prompt('Reasons why the job submission is denied:', '');
    if(adminMessage == null || adminMessage == ''){
    } else {
      this.getLocalStorage();
      this.httpClient.put('http://localhost:3000/admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
        'accept': false,
        'message': adminMessage
      }).subscribe();
      this.updateListings(this.jobSubmissions, jobId);
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

  checkIfAdmin() {
    let userType: string = localStorage.getItem('isAdmin');
    if(userType != 'true'){
      this.router.navigate(['']);
    }
  }
}

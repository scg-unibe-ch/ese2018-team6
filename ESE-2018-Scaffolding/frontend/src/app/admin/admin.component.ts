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

  userId: number;
  userToken: string;
  userApplications: Company[] = [];
  jobSubmissions: Job[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.checkIfAdmin();

    this.userId = parseInt(localStorage.getItem('user-id'));
    this.userToken = localStorage.getItem('user-token');

    this.onLoadingUserApplications();
    this.onLoadingJobSubmissions();
  }

  checkIfAdmin() {
    let userType: number = parseInt(localStorage.getItem('isAdmin'));
    if(userType != 1){
      this.router.navigate(['']);
    }
  }

  onLoadingUserApplications() {
    this.httpClient.get('http://localhost:3000/admin/unverifiedCompanies/' + this.userId + '/' + this.userToken)
      .subscribe(
        (instances: any) => {
          this.userApplications = instances.map((instance) => new Company(
            instance.userId,
            instance.companyName,
            '', // TODO Add logo link (BACKEND)
            instance.companyStreet,
            instance.companyHouseNumber,
            instance.companyPostcode,
            instance.companyCity,
            instance.contactName,
            '', // TODO Add contact email (BACKEND)
            instance.contactPhone,
            '', // TODO Add website link (BACKEND)
            instance.companyDescription
          ))
        }
      )
  }

  onLoadingJobSubmissions() {
    this.httpClient.get('http://localhost:3000/admin/unacceptedJobItems/' + this.userId + '/' + this.userToken)
      .subscribe(
        (instances: any) => {
          this.jobSubmissions = instances.map((instance) => new Job( // TODO Adjust mapping (BACKEND)
            instance.id,
            instance.title,
            instance.description,
            instance.skills,
            new Date(instance.startDate),
            new Date(instance.endDate),
            new Date(instance.validUntil),
            instance.workloadMin,
            instance.workloadMax,
            instance.languages,
            instance.street,
            instance.houseNumber,
            instance.postcode,
            instance.city,
            instance.salaryType,
            instance.salaryAmount,
            instance.companyId
          ))
        }
      )
  }

  approveUserApplication(userId: number) {
    if(confirm('Are you sure you want to approve this user?')){
      console.log(userId);
      this.httpClient.put('http://localhost:3000/admin/verify/' + userId + '/' + this.userId + '/' + this.userToken, {
        'verify': true
      }).subscribe();
    }
  }

  denyUserApplication(userId: number) {
    let adminMessage = prompt('Reasons why the user application is denied:', '');
    if (adminMessage == null || adminMessage == '') {
    } else {
      this.httpClient.put('http://localhost:3000/admin/verify/' + userId + '/' + this.userId + '/' + this.userToken, {
        'verify': false,
        'message': adminMessage
      }).subscribe();
    }
  }

  approveJobSubmission(jobId: number) {
    if(confirm('Are you sure you want to approve this job posting?')){
      console.log(jobId);
      this.httpClient.put('http://localhost:3000/admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
        'accept': true
      }).subscribe();
    }
  }

  denyJobSubmission(jobId: number) {
    let adminMessage = prompt('Reasons why the job submission is denied:', '');
    if(adminMessage == null || adminMessage == ''){
    } else {
      this.httpClient.put('http://localhost:3000/admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
        'accept': false,
        'message': 'reason of denial'
      }).subscribe();
    }
  }
}

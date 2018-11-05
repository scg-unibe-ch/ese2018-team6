import { Component, OnInit } from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  userId: string;
  userToken: string;
  jobData: Job = new Job(
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
    null,
  null,
    null
  );

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    if(!this.checkIfLoggedIn()){
      this.router.navigate(['']);
    }

    this.userId = localStorage.getItem('user-id');
    this.userToken = localStorage.getItem('user-token');
  }

  checkIfLoggedIn() {
    return localStorage.getItem('user-token');
  }

  onCreate() {
    // TODO Check if required fields are ok
    this.httpClient.post('http://localhost:3000/jobitem/' + this.userId + '/' + this.userToken, {
      'title': this.jobData.title,
      'description': this.jobData.description,
      'startDate': this.jobData.startDate,
      'endDate': this.jobData.endDate,
      'validUntil': this.jobData.validUntil,
      'workloadMin': this.jobData.workloadMin,
      'workloadMax': this.jobData.workloadMax,
      'languages': this.jobData.languages,
      'street': this.jobData.street,
      'houseNumber': this.jobData.houseHumber,
      'postcode': this.jobData.zipCode,
      'city': this.jobData.place,
      'salaryType': this.jobData.salaryType,
      'salaryAmount': this.jobData.salaryAmount,
      'skills': this.jobData.skills
    }).subscribe();

    this.router.navigate(['/my-account']);
  }
}

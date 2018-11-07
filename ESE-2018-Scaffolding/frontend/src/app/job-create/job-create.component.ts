import {Component, OnInit} from '@angular/core';
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
    null,
    null,
    null,
    null,
  );

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  onCreate() {
    if(this.isDataValid()){
      this.getLocalStorage();
      this.httpClient.post('http://localhost:3000/jobitem/' + this.userId + '/' + this.userToken, {
        'title': this.jobData.title,
        'description': this.jobData.description,
        'startDate': this.jobData.startDate,
        'endDate': this.jobData.endDate,
        'validUntil': this.jobData.validUntil,
        'workloadMin': this.jobData.workloadMin,
        'workloadMax': this.jobData.workloadMax,
        'firstLanguage': this.jobData.firstLanguage,
        'secondLanguage': this.jobData.secondLanguage,
        'street': this.jobData.street,
        'houseNumber': this.jobData.houseNumber,
        'postcode': this.jobData.postcode,
        'city': this.jobData.city,
        'salaryType': this.jobData.salaryType,
        'salaryAmount': this.jobData.salaryAmount,
        'skills': this.jobData.skills
      }).subscribe(
        res => {
          this.router.navigate(['/my-account']);
        },
        err => {
          // TODO - Give useful feedback on failed job creation
          console.log(err.error.message);
        }
      );
    }
  }

  isDataValid() {
    // TODO - Check user inputs (title required; date format; workload & salary is number etc.)
    return true;
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

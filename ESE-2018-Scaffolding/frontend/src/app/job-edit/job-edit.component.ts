import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobId: number;
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
    null
  );

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkIfLoggedIn();
    this.jobId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoadingJob();
  }

  onLoadingJob() {
    this.httpClient.get('http://localhost:3000/jobitem/' + this.jobId).subscribe(
      (instance: any) => this.jobData = new Job(
        this.jobId,
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

  onUpdate() {
    if(this.isDataValid()){
      this.getLocalStorage();
      this.httpClient.put('http://localhost:3000/jobitem/' + this.jobId + '/' + this.userId + '/' + this.userToken, {
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
          // TODO - Give useful feedback on failed job edit
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

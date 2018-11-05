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
    null
  );

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(!this.checkIfLoggedIn()){
      this.router.navigate(['']);
    }
    this.jobId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoadingJob();

    this.userId = localStorage.getItem('user-id');
    this.userToken = localStorage.getItem('user-token');
  }

  checkIfLoggedIn() {
    return localStorage.getItem('user-token');
  }

  onLoadingJob() {
    this.httpClient.get('http://localhost:3000/jobitem/' + this.jobId).subscribe(
      (instance: any) => this.jobData = new Job(
        this.jobId,
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

  onUpdate() {
    this.httpClient.put('http://localhost:3000/jobitem/' + this.jobId + '/' + this.userId + '/' + this.userToken, {
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

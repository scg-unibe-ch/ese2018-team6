import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../company.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  jobId: number;
  jobCompanyId: number;
  jobData: Job = new Job(
    null,
    null,
    null,
    null,
    new Date(),
    new Date(),
    new Date(),
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
  userData: Company = new Company(
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

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.jobId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.onLoadingJob();
    this.onLoadingUser();
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
      )
    )
  }

  // TODO Fix data loading - wait for onLoadingJob() to get its data. Fix hardcoded value.
  onLoadingUser() {
    this.httpClient.get('http://localhost:3000/company/' + this.jobId).subscribe(
      (instance: any) => this.userData = new Company (
        this.jobId,
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
}

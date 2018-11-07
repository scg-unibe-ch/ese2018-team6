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
    ''
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
    ''
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
        ''
      )
    )
  }

  // TODO - Fix data loading - wait for onLoadingJob() to get its data. Fix hardcoded value.
  onLoadingUser() {
    this.httpClient.get('http://localhost:3000/company/' + this.jobId).subscribe(
      (instance: any) => this.companyData = new Company (
        this.jobData.companyId,
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
        ''
      ));
  }

  /*
  onLoadingUser() {
    let received: boolean = false;
    while(!received){
      if(this.jobData.companyId = 0){
        console.log(this.jobData.companyId);
        this.httpClient.get('http://localhost:3000/company/' + this.jobData.companyId).subscribe(
          (instance: any) => this.companyData = new Company (
            this.jobData.companyId,
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
            ''
          ));
        received = true;
      }
    }
  }
  */
}

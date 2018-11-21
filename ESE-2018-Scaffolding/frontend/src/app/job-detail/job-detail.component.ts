import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../company.model';
import {FormatService} from '../format.service';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  jobId: number;
  companyId: number;
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
    '',
    null
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
    '',
    null
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private request: RequestService,
    public format: FormatService
  ) { }

  /**
   *  Upon loading the component, parses the jobId and companyId from the parameters in the URL.
   *  Loads details for both job posting and corresponding company of the given IDs.
   */
  ngOnInit() {
    this.jobId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.companyId = parseInt(this.activatedRoute.snapshot.paramMap.get('company'));
    this.loadJobDetails();
    this.loadCompanyDetails();
  }

  /**
   *  Loads details of the job posting with the given ID.
   */
  loadJobDetails() {
    this.request.jobDetails(this.jobId).subscribe(
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
      )
    )
  }

  /**
   *  Loads details of the company with the given ID.
   */
  loadCompanyDetails() {
    this.request.companyDetails(this.companyId).subscribe(
      (instance: any) => this.companyData = new Company (
        this.companyId,
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
      )
    )
  }
}

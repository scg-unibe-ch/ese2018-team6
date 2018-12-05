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
  jobData: Job;
  companyData: Company;

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
   *  Loads details of the job posting with the ID that was received as a parameter.
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
        instance.accepted,
        instance.featured,
        instance.companyName,
      )
    )
  }

  /**
   *  Loads details of company with the ID that was received as a parameter.
   *  This company is related to the job posting on the given page.
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
        instance.verified,
        instance.onceVerified,
        instance.featured,
      )
    )
  }
}

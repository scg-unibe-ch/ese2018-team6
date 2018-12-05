import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../request.service';
import {FormatService} from '../format.service';
import {Job} from '../job.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyId: number;
  companyData: Company;
  companyJobs: Job[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private request: RequestService,
    private toastr: ToastrService,
    public format: FormatService,
  ) { }

  ngOnInit() {
    this.companyId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadCompanyDetails();
    this.loadCompanyJobs();
  }

  /**
   *  Loads details of company with the ID that was received as a parameter.
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

  loadCompanyJobs() {
    this.request.jobListCompany(this.companyId).subscribe(
      (response: any) => {
        this.companyJobs = response.map((instance) => new Job(
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
          instance.accepted,
          instance.featured,
          instance.companyName,
        ))
      },
      (err) => {
        this.toastr.error(err.error.message, 'Failed to load job postings');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {RequestService} from '../request.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyData: Company[] = [];

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    public request: RequestService,
  ) { }

  /**
   *  Upon loading the component, it fetches the required company details.
   */
  ngOnInit() {
    this.loadCompanyDetails();
  }

  /**
   *  Loads the details of all companies that are not unverified (verified or once verified)
   */
  loadCompanyDetails() {
    this.request.companyListAll().subscribe(
      (response: any) => {
        this.companyData = response.map((instance) => new Company (
          instance.userId,
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
        ))
      },
      (err) => {
        this.toastr.error(err.error.message, 'Failed to load companies');
      }
    );
  }
}



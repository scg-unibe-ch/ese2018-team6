import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';
import {ValidationService} from '../validation.service';
import {RequestService} from '../request.service';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyData: Company[] = [];
  showResults: string = 'allCompanies';

  constructor(private httpClient: HttpClient,
              private toastr: ToastrService,
              private format: FormatService,
              private validation: ValidationService,
              public request: RequestService,) {

  }

  ngOnInit() {
    this.loadCompanyDetails();
  }

  loadCompanyDetails() {
    this.request.companyListAll().subscribe(
      (response: any) => {
        this.companyData = response.map((instance) => new Company (
          instance.id,
          instance.name,
          instance.logo,
          instance.street,
          instance.houseNumber,
          instance.postcode,
          instance.city,
          instance.contactName,
          instance.contactEmail,
          instance.contactPhone,
          instance.website,
          instance.description,
          instance.userId,
          instance.messageFromAdmin,
          instance.verified,
          instance.onceVerified,
<<<<<<< HEAD
          instance.featured
=======
          instance.featured,
>>>>>>> 40000e62c7e6d6bd6dde5ff8defc1d77113abb79
        ))
      },
      (err) => {
        this.toastr.error(err.error.message, 'Failed to load companies');
      }
    );
  }
}



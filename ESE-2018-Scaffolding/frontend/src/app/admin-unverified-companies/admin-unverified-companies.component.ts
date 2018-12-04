import {Component, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {FormatService} from '../format.service';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-unverified-companies',
  templateUrl: './admin-unverified-companies.component.html',
  styleUrls: ['./admin-unverified-companies.component.css']
})
export class AdminUnverifiedCompaniesComponent implements OnInit {

  companyList: Company[] = [];

  constructor(
    private format: FormatService,
    private request: RequestService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  /**
   *  Upon loading, checks if the admin is logged in.
   *  If it's not the admin, the user gets redirected to the home page.
   *  Otherwise, all unverified companies get fetched.
   */
  ngOnInit() {
    this.request.checkIfAdmin();
    this.loadUnverifiedCompanies();
  }

  /**
   *  Loads all unverified companies from the database. Only available for admin.
   */
  loadUnverifiedCompanies() {
    this.request.companyFetchUnverified().subscribe(
      (response: any) => {
        this.companyList = response.map((instance) => new Company(
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
          instance.featured
        ))
      }
    );
  }

  /**
   *  Approves the company application with the given ID. Only available for admin.
   *  Removes the company application from the list after it has been evaluated.
   *
   *  @param companyId            ID of the company that gets approved.
   */
  approveCompany(companyId: number) {
    this.request.companyApprove(companyId);
    AdminUnverifiedCompaniesComponent.updateListings(this.companyList, companyId);
  }

  /**
   *  Denies the company application with the given ID. Only available for admin.
   *  Requires admin to specify why this company application was denied before removing it from the list.
   *
   *  @param companyId            ID of the company that gets denied.
   */
  denyCompany(companyId: number) {
    let adminMessage = prompt('Reasons why the user application is denied:', '');
    if (this.format.isEmpty(adminMessage)) {
    } else {
      this.request.companyDeny(companyId, adminMessage);
      AdminUnverifiedCompaniesComponent.updateListings(this.companyList, companyId);
    }
  }

  /**
   *  Removes an item from the array that matches the given id.
   *
   *  @param array                Array where item gets removed
   *  @param idToDelete           ID of the item that gets removed
   */
  static updateListings(array, idToDelete){
    for(let i = 0; i < array.length; i++){
      if (array[i].id == idToDelete) {
        array = array.splice(i, 1);
        break;
      }
    }
  }
}

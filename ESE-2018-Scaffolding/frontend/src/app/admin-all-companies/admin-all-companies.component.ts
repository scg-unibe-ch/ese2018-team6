import { Component, OnInit } from '@angular/core';
import {Company} from '../company.model';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormatService} from '../format.service';

@Component({
  selector: 'app-admin-all-companies',
  templateUrl: './admin-all-companies.component.html',
  styleUrls: ['./admin-all-companies.component.css']
})
export class AdminAllCompaniesComponent implements OnInit {

  companyList: Company[] = [];

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    private format: FormatService,
    private router: Router,
  ) { }

  /**
   *  Upon loading, checks if the admin is logged in.
   *  If it's not the admin, the user gets redirected to the home page.
   *  Otherwise, all companies get fetched.
   */
  ngOnInit() {
    this.request.checkIfAdmin();
    this.request.checkUserAccess();
    this.loadCompanies();
  }

  /**
   *  Loads all companies from the database no matter what status they have.
   *  Only available for admin.
   */
  loadCompanies() {
    this.request.companyFetchAll().subscribe(
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
          instance.featured,
        ))
      },
      err => {
        if(err.error.message == 'Not authorized') {
          this.toastr.error('You are not an admin', 'Access denied');
          this.router.navigate(['']).then();
        }
        if(err.error.message == 'Wrong Token') {
          this.toastr.error('Wrong Token', 'Access denied');
          this.router.navigate(['']).then();
        }
      }
    );
  }

  /**
   *  Approves the company with the given companyId. Only available for admin.
   *
   *  @param companyId              ID of the company that gets approved.
   */
  approveCompany(companyId: number) {
    this.request.companyApprove(companyId);
  }

  /**
   *  Denies the company with the given companyId. Only available for admin.
   *
   *  @param companyId              ID of the company that gets denied.
   */
  denyCompany(companyId: number) {
    let adminMessage = prompt('Reasons why the user application is denied:', '');
    if (this.format.isEmpty(adminMessage)) {
    } else {
      this.request.companyDeny(companyId, adminMessage);
      for(let i = 0; i < this.companyList.length; i++){
        if (this.companyList[i].id == companyId) {
          this.companyList[i].verified = false;
          break;
        }
      }
    }
  }

  /**
   *  Features the company with the given companyId. Only available for admin.
   *
   *  @param companyId              ID of the company that gets featured.
   */
  featureCompany(companyId: number) {
    this.request.companyFeaturedStatus(companyId, true);
  }

  /**
   *  Unfeatures the company with the given companyId. Only available for admin.
   *
   *  @param companyId              ID of the company that gets unfeatured.
   */
  unfeatureCompany(companyId: number) {
    this.request.companyFeaturedStatus(companyId, false);
  }

  /**
   *  Deletes the company with the given companyId. Only available for admin.
   *
   *  @param companyId              ID of the company that gets deleted.
   */
  deleteCompany(companyId: number) {
    if(confirm('Are you sure you want to delete this company?')){
      this.request.companyDelete(companyId);
      AdminAllCompaniesComponent.updateListings(this.companyList, companyId);
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

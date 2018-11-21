import {Component, OnInit} from '@angular/core';
import {Company} from '../company.model';
import {Job} from '../job.model';
import {RequestService} from '../request.service';
import {FormatService} from '../format.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userApplications: Company[] = [];
  jobSubmissions: Job[] = [];

  constructor(
    private format: FormatService,
    private request: RequestService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  /**
   *
   */
  ngOnInit() {
    this.request.checkIfAdmin();
    this.getUserApplications();
    this.getJobSubmissions();
  }

  /**
   *
   */
  getUserApplications() {
    this.request.userApplicationFetching().subscribe(
      (response: any) => {
        this.userApplications = response.map((instance) => new Company(
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
          instance.verified
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
   *
   *
   * @param {number} userId
   */
  approveUserApplication(userId: number) {
    if(confirm('Are you sure you want to approve this user?')){
      this.request.userApplicationApproved(userId);
      AdminComponent.updateListings(this.userApplications, userId);
    }
  }

  /**
   *
   *
   * @param {number} userId
   */
  denyUserApplication(userId: number) {
    let adminMessage = prompt('Reasons why the user application is denied:', '');
    if (this.format.isEmpty(adminMessage)) {
    } else {
      this.request.userApplicationDenied(userId, adminMessage);
      AdminComponent.updateListings(this.userApplications, userId);
    }
  }

  /**
   *
   */
  getJobSubmissions() {
    this.request.jobSubmissionFetching().subscribe(
      (instances: any) => {
        this.jobSubmissions = instances.map((instance) => new Job(
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
          instance.accepted
        ))
      }
    );
  }

  /**
   *
   *
   * @param {number} jobId
   */
  approveJobSubmission(jobId: number) {
    if(confirm('Are you sure you want to approve this job posting?')){
      this.request.jobSubmissionApproved(jobId);
      AdminComponent.updateListings(this.jobSubmissions, jobId);
    }
  }

  /**
   *
   *
   *  @param {number} jobId
   */
  denyJobSubmission(jobId: number) {
    let adminMessage = prompt('Reasons why the job submission is denied:', '');
    if(this.format.isEmpty(adminMessage)){
    } else {
      this.request.jobSubmissionDenied(jobId, adminMessage);
      AdminComponent.updateListings(this.jobSubmissions, jobId);
    }
  }

  /**
   *
   *
   * @param array
   * @param idToDelete
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

import { Component, OnInit } from '@angular/core';
import {Job} from '../job.model';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';

@Component({
  selector: 'app-admin-all-jobs',
  templateUrl: './admin-all-jobs.component.html',
  styleUrls: ['./admin-all-jobs.component.css']
})
export class AdminAllJobsComponent implements OnInit {

  jobList: Job[] = [];

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    private format: FormatService,
  ) { }

  /**
   *  Upon loading, checks if the admin is logged in.
   *  If it's not the admin, the user gets redirected to the home page.
   *  Otherwise, all job postings get fetched.
   */
  ngOnInit() {
    this.request.checkIfAdmin();
    this.loadJobs();
  }

  /**
   *  Loads all job postings from the database no matter what status they have.
   *  Only available for admin.
   */
  loadJobs() {
    this.request.jobFetchAll().subscribe(
      (instances: any) => {
        this.jobList = instances.map((instance) => new Job(
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
      }
    );

  }

  /**
   *  Approves the job posting with the given jobId. Only available for admin.
   *
   *  @param jobId                  ID of the job posting that gets approved
   */
  approveJob(jobId: number) {
    this.request.jobApprove(jobId);
  }

  /**
   *  Denies the job posting with the given jobId. Only available for admin.
   *
   *  @param jobId                  ID of the job posting that gets denied
   */
  denyJob(jobId: number) {
    let adminMessage = prompt('Reasons why the job submission is denied:', '');
    if (this.format.isEmpty(adminMessage)) {
    } else {
      this.request.jobDeny(jobId, adminMessage);
    }
  }

  /**
   *  Features the job posting with the given jobId. Only available for admin.
   *
   *  @param jobId                  ID of job posting that gets featured.
   */
  featureJob(jobId: number) {
    this.request.jobFeaturedStatus(jobId, true);
  }

  /**
   *  Unfeatures the job posting with the given jobId. Only available for admin.
   *
   *  @param jobId                  ID of job posting that gets unfeatured.
   */
  unfeatureJob(jobId: number) {
    this.request.jobFeaturedStatus(jobId, false);
  }

  /**
   *  Deletes the job posting with the given jobId. Only available for admin.
   *
   *  @param jobId                  ID of job posting that gets deleted.
   */
  deleteJob(jobId: number) {
    if(confirm('Are you sure you want to delete this job item?')){
      this.request.jobDelete(jobId);
      AdminAllJobsComponent.updateListings(this.jobList, jobId);
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

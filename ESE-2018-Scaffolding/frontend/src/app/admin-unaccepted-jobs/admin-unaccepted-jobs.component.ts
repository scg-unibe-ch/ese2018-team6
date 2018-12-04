import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {FormatService} from '../format.service';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-unaccepted-jobs',
  templateUrl: './admin-unaccepted-jobs.component.html',
  styleUrls: ['./admin-unaccepted-jobs.component.css']
})
export class AdminUnacceptedJobsComponent implements OnInit {

  jobList: Job[] = [];

  constructor(
    private format: FormatService,
    private request: RequestService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  /**
   *  Upon loading, checks if the admin is logged in.
   *  If it's not the admin, the user gets redirected to the home page.
   *  Otherwise, all unaccepted job postings get fetched.
   */
  ngOnInit() {
    this.request.checkIfAdmin();
    this.loadUnacceptedJobs();
  }

  /**
   *  Loads all unaccepted job postings from the database. Only available for admin.
   */
  loadUnacceptedJobs() {
    this.request.jobFetchUnaccepted().subscribe(
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
   *  Approves the job posting with the given ID. Only available for admin.
   *  Removes the job posting from the list after it has been evaluated.
   *
   *  @param jobId                ID of the job that gets approved
   */
  approveJob(jobId: number) {
    this.request.jobApprove(jobId);
    AdminUnacceptedJobsComponent.updateListings(this.jobList, jobId);
  }

  /**
   *  Denies the job posting with the given ID. Only available for admin.
   *  Requires admin to specify why this job posting was denied before removing it from the list.
   *
   *  @param jobId                ID of the job that gets denied
   */
  denyJob(jobId: number) {
    let adminMessage = prompt('Reasons why the job submission is denied:', '');
    if(this.format.isEmpty(adminMessage)){
    } else {
      this.request.jobDeny(jobId, adminMessage);
      AdminUnacceptedJobsComponent.updateListings(this.jobList, jobId);
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

import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {Router} from '@angular/router';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  myJobPostings: Job[] = [];
  acceptedPostings: Job[] = [];
  inReviewPostings: Job[] = [];
  deniedPostings: Job[] = [];

  sortingIncomplete: boolean = true;
  myJobPostingsView: string = 'all';

  constructor(
    private router: Router,
    private request: RequestService
  ) {}

  /**
   *  Upon loading the component, checks if a user is logged in that could access this page.
   *  If there is one, it loads all his personal job postings.
   */
  ngOnInit() {
    this.checkIfLoggedIn();
    this.loadMyJobs();
  }

  /**
   *  Loads all personal job postings of the current user.
   */
  loadMyJobs() {
    this.request.loadMyJobs().subscribe(
        (response: any) => {
          this.myJobPostings = response.map((instance) => new Job(
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
            instance.message,
            instance.accepted
          )
        )
      }
    )
  }

  /**
   *  Redirects to the edit page of the job posting with the given jobId.
   *  Requires the jobId of the about to be edited job posting.
   *
   *  @param {number} jobId           ID of job posting to be edited.
   */
  editJobSubmission(jobId: number) {
    this.router.navigate(['/jobs/edit/' + jobId]);
  }

  /**
   *  Deletes your job posting with the given jobId after confirmation.
   *  Also removes the deleted job posting from the various job posting lists.
   *  Requires the jobId of the about to be deleted job posting.
   *
   *  @param {number} jobId           ID of job posting to be deleted.
   */
  deleteJobSubmission(jobId: number) {
    if(confirm('You are about to delete your job posting. Are you sure?')){
      this.request.deleteMyJob(jobId);
      MyAccountComponent.updateListings(this.myJobPostings, jobId);
      MyAccountComponent.updateListings(this.acceptedPostings, jobId);
      MyAccountComponent.updateListings(this.inReviewPostings, jobId);
      MyAccountComponent.updateListings(this.deniedPostings, jobId);
    }
  }

  /**
   *  Updates an array of job postings by removing an element that has been deleted.
   *  Requires the array that gets updated and the ID of the job posting that gets removed.
   *
   *  @param array                    Array that is being updated.
   *  @param idToDelete               ID of job posting that is being removed.
   */
  static updateListings(array, idToDelete){
    for(let i = 0; i < array.length; i++){
      if (array[i].id == idToDelete) {
        array = array.splice(i, 1);
        break;
      }
    }
  }

  /**
   *  Toggles between the two views 'all' and 'grouped' of personal job postings.
   */
  changeSort() {
    if(this.sortingIncomplete){
      this.sortPostings();
      this.sortingIncomplete = false;
    }
    this.myJobPostingsView = (this.myJobPostingsView == 'all') ? (this.myJobPostingsView = 'grouped') : (this.myJobPostingsView = 'all');
  }

  /**
   *  Sorts personal job postings into separate lists according to their current status.
   */
  sortPostings() {
    for(let i in this.myJobPostings) {
      switch (this.myJobPostings[i].accepted) {
        case true: {
          this.acceptedPostings.push(this.myJobPostings[i]);
          break;
        }
        case null: {
          this.inReviewPostings.push(this.myJobPostings[i]);
          break;
        }
        case false: {
          this.deniedPostings.push(this.myJobPostings[i]);
          break;
        }
      }
    }
  }

  /**
   *  Checks if a token from a user is stored in LocalStorage.
   *  If none is present (no user logged in), it will redirect to home page.
   */
  checkIfLoggedIn() {
    if(!localStorage.getItem('user-token')){
      this.router.navigate(['']).then();
    }
  }
}

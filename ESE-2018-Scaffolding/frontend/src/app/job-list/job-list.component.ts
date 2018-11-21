import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobData: Job[] = [];
  searchData: Job[] = [];
  filterData: Job[] = [];

  showResults: string = 'allJobs';
  showSearchFilter: string;

  searchTerm: string = '';
  searchTermDisplayed: string;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    public request: RequestService
  ) { }

  ngOnInit() {
    this.loadJobListAll();
  }

  /**
   *  Loads a list of all accepted job postings.
   */
  loadJobListAll() {
    this.request.jobListAll().subscribe(
      (response: any) => {
        this.jobData = response.map((instance) => new Job(
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
      },
      (err) => {
        this.toastr.error(err.error.message, 'Failed to load job postings');
      }
    );
  }

  /**
   *  Loads a list of all accepted job postings that match the search term.
   */
  loadJobListSearch() {
    if(this.searchTerm.length >= 1){
      this.showResults = 'searchResults';
      this.searchTermDisplayed = this.searchTerm;
      this.request.jobListSearch(this.searchTerm).subscribe(
        (response: any) => {
          this.searchData = response.map((instance) => new Job(
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
        },
        (err) => {
          this.toastr.error(err.error.message, 'Failed to search job postings');
        }
      );
    } else {
      this.toastr.error('Search term cannot be empty', 'Search failed');
    }
  }

  /**
   *  Cancels searching by closing the box an deleting previously fetched details.
   */
  cancelSearch() {
    this.toggleSearch();
    this.searchTerm = '';
    this.searchData = [];
    this.showResults = 'allJobs';
  }

  /**
   *  Loads a list of all accepted job postings that match the filter values.
   */
  loadJobListFilter() {
    this.showResults = 'filterResults';
    // TODO - GET-Request and place data in filterData.
  }

  /**
   *  Cancels filtering by closing the box and deleting previously fetched details.
   */
  cancelFilter() {
    this.toggleFilter();
    // TODO - Reset filter values
    this.filterData = [];
    this.showResults = 'allJobs';
  }

  /**
   *  Toggles the search box on and off.
   */
  toggleSearch() {
    this.showSearchFilter = (this.showSearchFilter != 'search') ? (this.showSearchFilter = 'search') : (this.showSearchFilter = '');
  }

  /**
   *  Toggles the filter box on and off.
   */
  toggleFilter() {
    this.showSearchFilter = (this.showSearchFilter != 'filter') ? (this.showSearchFilter = 'filter') : (this.showSearchFilter = '');
  }
}

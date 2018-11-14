import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';

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

  searchTerm: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem').subscribe(
      (instances: any) => {
        this.jobData = instances.map((instance) => new Job(
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

  submitSearch() {
    this.showResults = 'searchResults';
    // TODO - GET-Request and place data in searchData.
  }

  cancelSearch() {
    this.toggleSearch();
    this.searchTerm = '';
    this.searchData = [];
    this.showResults = 'allJobs';
  }

  submitFilter() {
    this.showResults = 'filterResults';
    // TODO - GET-Request and place data in filterData.
  }

  cancelFilter() {
    this.toggleFilter();
    // TODO - Reset filter values
    this.filterData = [];
    this.showResults = 'allJobs';
  }

  toggleSearch() {
    this.showSearchFilter = (this.showSearchFilter != 'search') ? (this.showSearchFilter = 'search') : (this.showSearchFilter = '');
  }

  toggleFilter() {
    this.showSearchFilter = (this.showSearchFilter != 'filter') ? (this.showSearchFilter = 'filter') : (this.showSearchFilter = '');
  }

  isLoggedIn() {
    return localStorage.getItem('user-token');
  }
}

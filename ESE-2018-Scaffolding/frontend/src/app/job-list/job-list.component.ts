import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {RequestService} from '../request.service';
import {FormatService} from '../format.service';
import {ErrorMessage} from '../errorMessage';
import {ValidationService} from '../validation.service';

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
  filterValues: string;

  datePostedFrom: string = '';
  datePostedTo: string = '';
  startDateFrom: string = '';
  startDateEnd: string = '';
  endDateFrom: string = '';
  endDateEnd: string = '';
  validUntilFrom: string = '';
  validUntilEnd: string = '';
  firstLanguage: string = '';
  secondLanguage: string = '';
  postcodeMin: number;
  postcodeMax: number;
  salaryAmountMin: number;
  salaryAmountMax: number;
  workloadMin: number;
  workloadMax: number;

  error: ErrorMessage = new ErrorMessage();

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private format: FormatService,
    private validation: ValidationService,
    public request: RequestService,
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
          instance.accepted,
          instance.featured,
          instance.companyName,
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
            instance.accepted,
            instance.featured,
            instance.companyName,
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

  /*buildFilterString() {
    let filterData = [];

    let filterValue;
    let filterMin;
    let filterMax;

    if(!(this.format.isEmpty(this.datePostedFrom) && this.format.isEmpty(this.datePostedTo))) {
      filterValue = "datePosted";
      if (!this.format.isEmpty(this.datePostedFrom)) {
        filterMin = this.format.dateFromStringToMillisecond(this.datePostedFrom);
      } else {
        filterMin = 0;
      }
      if (!this.format.isEmpty((this.datePostedTo))) {
        filterMax = this.format.dateFromStringToMillisecond(this.datePostedTo);
      } else {
        filterMax = 200000000000000;
      }
      filterData[0] = {filter: filterValue, minDate: filterMin, maxDate: filterMax};
    } else {
      filterData[0] = {};
    }

    if(!(this.format.isEmpty(this.startDateFrom) && this.format.isEmpty(this.startDateEnd))) {
      filterValue = "startDate";
      if (!this.format.isEmpty(this.startDateFrom)) {
        filterMin = this.format.dateFromStringToMillisecond(this.startDateFrom);
      } else {
        filterMin = 0;
      }
      if (!this.format.isEmpty((this.startDateEnd))) {
        filterMax = this.format.dateFromStringToMillisecond(this.startDateEnd);
      } else {
        filterMax = 200000000000000;
      }
      filterData[1] = {filter: filterValue, minDate: filterMin, maxDate: filterMax};
    } else {
      filterData[1] = {};
    }

    if(!(this.format.isEmpty(this.endDateFrom) && this.format.isEmpty(this.endDateEnd))) {
      filterValue = "endDate";
      if (!this.format.isEmpty(this.endDateFrom)) {
        filterMin = this.format.dateFromStringToMillisecond(this.endDateFrom);
      } else {
        filterMin = 0;
      }
      if (!this.format.isEmpty((this.endDateEnd))) {
        filterMax = this.format.dateFromStringToMillisecond(this.endDateEnd);
      } else {
        filterMax = 200000000000000;
      }
      filterData[2] = {filter: filterValue, minDate: filterMin, maxDate: filterMax};
    } else {
      filterData[2] = {};
    }

    if(!(this.format.isEmpty(this.validUntilFrom) && this.format.isEmpty(this.validUntilEnd))) {
      filterValue = "validUntil";
      if (!this.format.isEmpty(this.validUntilFrom)) {
        filterMin = this.format.dateFromStringToMillisecond(this.validUntilFrom);
      } else {
        filterMin = 0;
      }
      if (!this.format.isEmpty((this.validUntilEnd))) {
        filterMax = this.format.dateFromStringToMillisecond(this.validUntilEnd);
      } else {
        filterMax = 200000000000000;
      }
      filterData[3] = {filter: filterValue, minDate: filterMin, maxDate: filterMax};
    } else {
      filterData[3] = {};
    }

    if(!(this.format.isEmpty(this.firstLanguage))) {
      filterValue = "language";
      if (!(this.format.isEmpty(this.secondLanguage))) {
        filterData[4] = {filter: filterValue, languages: [this.firstLanguage, ""]};
      } else {
        filterData[4] = {filter: filterValue, languages: [this.firstLanguage, this.secondLanguage]};
      }
    } else {
      filterData[4] = {};
    }

    if(this.postcodeMin >= 1000 || this.postcodeMax < 10000){
      filterValue = "postcode";
      if (this.postcodeMin >= 1000 && this.postcodeMin.toString() != '') {
        filterMin = this.postcodeMin;
      } else {
        filterMin = 1000;
      }
      if (this.postcodeMax < 10000 && this.postcodeMax.toString() != '') {
        filterMax = this.postcodeMax;
      } else {
        filterMax = 9999;
      }
      filterData[5] = {filter: filterValue, postcodes: [filterMin.toString(), filterMax.toString()]};
    } else {
      filterData[5] = {};
    }

    if((this.salaryAmountMin >= 0 || this.salaryAmountMax >= 0) && (this.salaryAmountMin != null || this.salaryAmountMax != null)){
      filterValue = "salaryAmount";
      if (this.salaryAmountMin >= 0 && this.salaryAmountMin != null && this.salaryAmountMin.toString() != '') {
        filterMin = this.salaryAmountMin;
      } else {
        filterMin = 0;
      }
      if (this.salaryAmountMax >= 0 && this.salaryAmountMax != null && this.salaryAmountMax.toString() != '') {
        filterMax = this.salaryAmountMax;
      } else {
        filterMax = 1000000000;
      }
      filterData[6] = {filter: filterValue, minSalary: filterMin, maxSalary: filterMax};
    } else {
      filterData[6] = {};
    }

    if(this.workloadMin > 0 || this.workloadMax > 0){
      filterValue = "workload";
      if (this.workloadMin > 0 && this.workloadMin.toString() != '') {
        filterMin = this.workloadMin;
      } else {
        filterMin = 1;
      }
      if (this.workloadMax > 0 && this.workloadMax.toString() != '') {
        filterMax = this.workloadMax;
      } else {
        filterMax = 100;
      }
      filterData[7] = {filter: filterValue, minworkload: filterMin, maxworkload: filterMax};
    } else {
      filterData[7] = {};
    }

    console.log(JSON.stringify(filterData));
    return JSON.stringify(filterData);
  }
*/
/*
  // TODO - Use validation service to check filter input
  checkFilterData() {
    let errorFree = true;

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }
*/
  /**
   *  Loads a list of all accepted job postings that match the filter values.
   */
  filter(filterList) {
      this.showResults = 'filterResults';
      this.request.jobListFilter(filterList).subscribe(
        (response: any) => {
          this.filterData = response.map((instance) => new Job(
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
        },
        (err) => {
          this.toastr.error(err.error.message, 'Failed to filter job postings');
        }
      );
  }
 /* loadJobListFilter() {
    this.filterValues = this.buildFilterString();
    if(this.checkFilterData()){
      this.showResults = 'filterResults';
      this.request.jobListFilter(this.filterValues).subscribe(
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
            instance.accepted,
            instance.featured,
            instance.companyName,
          ))
        },
        (err) => {
          this.toastr.error(err.error.message, 'Failed to filter job postings');
        }
      );
    } else {
      this.toastr.error('Invalid filter input', 'Filter failed');
    }
  }
*/

  /**
   *  Cancels filtering by closing the box and deleting previously fetched details.
   */
  cancelFilter() {
    this.datePostedFrom = '';
    this.datePostedTo = '';
    this.startDateFrom = '';
    this.startDateEnd = '';
    this.endDateFrom = '';
    this.endDateEnd = '';
    this.firstLanguage = '';
    this.secondLanguage = '';
    this.postcodeMin = null;
    this.postcodeMax = null;
    this.salaryAmountMin = null;
    this.salaryAmountMax = null;
    this.workloadMin = null;
    this.workloadMax = null;

    this.toggleFilter();
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

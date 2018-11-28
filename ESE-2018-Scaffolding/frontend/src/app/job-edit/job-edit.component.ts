import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';
import {ErrorMessage} from '../errorMessage';
import {ValidationService} from '../validation.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  jobId: number;
  jobData: Job = new Job(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  startDate: String = '';
  endDate: String = '';
  validUntil: String = '';
  error: ErrorMessage = new ErrorMessage();

  constructor(
    private request: RequestService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private validation: ValidationService,
    public format: FormatService
  ) { }

  /**
   *  Upon loading the page, checks if a user is logged in
   *  and loads job details according to jobId.
   */
  ngOnInit() {
    this.request.checkIfUser();
    this.jobId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.onLoadingJob();
  }

  /**
   *  Loads all details for a job according to the given jobId.
   */
  onLoadingJob() {
    this.request.jobDetails(this.jobId).subscribe(
      (instance: any) => this.jobData = new Job(
        this.jobId,
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
      ));
    setTimeout(() => {
      this.setDates();
    }, 70);
  }

  /**
   *  Updates job details with currently entered data in form fields.
   *  Only as long as they are valid.
   */
  onUpdate() {
    this.error = new ErrorMessage();
    if(this.isDataValid()){
      this.request.jobUpdate(this.jobData, this.startDate, this.endDate, this.validUntil);
    } else {
      this.toastr.error('Invalid Input', 'Job update failed');
    }
  }

  /**
   *  Checks the entered job data before sending to backend.
   *  Validation requires title, description, skill, full address.
   *  If a value fails, user receives accurate feedback.
   *  Returns true if valid; false otherwise.
   *
   *  @returns {boolean}              True if valid; false otherwise
   */
  isDataValid() {
    let errorFree = this.validation.validateJobItem(this.jobData, this.startDate, this.endDate, this.validUntil);

    if(errorFree){
      return true;
    } else {
      this.error = this.validation.getErrorMessage();
      return false;
    }
  }

  setDates() {
    if(this.jobData.startDate > 0){
      this.startDate = this.format.dateFromMillisecondToString(this.jobData.startDate);
    }
    if(this.jobData.endDate > 0){
      this.endDate = this.format.dateFromMillisecondToString(this.jobData.endDate);
    }
    if(this.jobData.validUntil > 0) {
      this.validUntil = this.format.dateFromMillisecondToString(this.jobData.validUntil);
    }
  }
}

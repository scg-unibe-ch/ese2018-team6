import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '../errorMessage';
import {ValidationService} from '../validation.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

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
    null,
    null,
    null,
  );
  startDate: String = '';
  endDate: String = '';
  validUntil: String = '';
  error: ErrorMessage = new ErrorMessage();

  constructor(
    public request: RequestService,
    private toastr: ToastrService,
    private validation: ValidationService
  ) { }

  /**
   *  Upon loading, checks if current user is logged in.
   *  If not he will be redirected to home page.
   */
  ngOnInit() {
    this.request.checkUserAccess();
  }

  /**
   *  Creates a new job posting (to be reviewed by admin) from data entered in form fields.
   *  Requires userId and userToken as only verified users can submit job postings.
   *  Entered data must be valid or the job submission won't be sent.
   */
  onCreate() {
    this.error = new ErrorMessage();
    if(this.isDataValid()){
      this.request.jobCreate(this.jobData, this.startDate, this.endDate, this.validUntil);
    } else {
      this.toastr.error('Invalid Input', 'Job creation failed');
    }
  }

  /**
   *  Checks the entered job data before sending to backend.
   *  Validation requires title, description, skills and a full address.
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
}

import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {RequestService} from '../request.service';
import {FormatService} from '../format.service';
import {ToastrService} from 'ngx-toastr';

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
    null
  );
  errorMessage: {[k: string]: any} = {};

  constructor(
    private request: RequestService,
    private toastr: ToastrService,
    private format: FormatService
  ) { }

  /**
   *  Upon loading, checks if current user is logged in.
   *  If not he will be redirected to home page.
   */
  ngOnInit() {
    this.request.checkIfUser();
  }

  /**
   *  Creates a new job posting (to be reviewed by admin) from data entered in form fields.
   *  Requires userId and userToken as only verified users can submit job postings.
   *  Entered data must be valid or the job submission won't be sent.
   */
  onCreate() {
    this.errorMessage = {};
    if(this.isDataValid()){
      this.request.jobCreate(this.jobData);
    } else {
      this.toastr.error('Invalid Input', 'Job creation failed');
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
    // Resets styling of all form fields
    let elements = ['title', 'description', 'skills', 'streetHouse', 'street', 'postcodeCity', 'postcode', 'city'];
    for(let i=0; i < elements.length; i++){
      this.format.removeError(elements[i]);
    }
    let errorFree = true;

    // Title cannot be empty
    if(this.format.isEmpty(this.jobData.title)){
      this.format.addError("title");
      this.errorMessage.titleEmpty = true;
      errorFree = false;
    }

    // Description cannot be empty
    if(this.format.isEmpty(this.jobData.description)){
      this.format.addError("description");
      this.errorMessage.descriptionEmpty = true;
      errorFree = false;
    }

    // Skills cannot be empty
    if(this.format.isEmpty(this.jobData.skills)){
      this.format.addError("skills");
      this.errorMessage.skillsEmpty = true;
      errorFree = false;
    }

    // Street cannot be empty
    if(this.format.isEmpty(this.jobData.street)){
      this.format.addError("streetHouse");
      this.format.addError("street");
      this.errorMessage.streetEmpty = true;
      errorFree = false;
    }

    // Postcode cannot be empty
    if(this.jobData.postcode === null || this.format.isEmpty(this.jobData.postcode.toString())){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeEmpty = true;
      errorFree = false;
    }

    // Postcode must be number between 1000 and 9999
    if(!(this.jobData.postcode>=1000 && this.jobData.postcode <= 9999)){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeNumber = true;
      errorFree = false;
    }

    // Postcode must be >= 1000
    if(this.jobData.postcode < 1000){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeLow = true;
      errorFree = false;
    }

    // Postcode must be <= 10'000
    if(this.jobData.postcode > 9999){
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.errorMessage.postcode = true;
      this.errorMessage.postcodeHigh = true;
      errorFree = false;
    }

    // City cannot be empty
    if(this.format.isEmpty(this.jobData.city)){
      this.format.addError("postcodeCity");
      this.format.addError("city");
      this.errorMessage.cityEmpty = true;
      errorFree = false;
    }

    // Return validation result
    return errorFree;
  }
}

import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../request.service';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from '../format.service';

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
  errorMessage: {[k: string]: any} = {};

  constructor(
    private request: RequestService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private format: FormatService
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
      ))
  }

  /**
   *  Updates job details with currently entered data in form fields.
   *  Only as long as they are valid.
   */
  onUpdate() {
    this.errorMessage = {};
    if(this.isDataValid()){
      this.request.jobUpdate(this.jobData);
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

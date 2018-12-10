import {Injectable} from '@angular/core';
import {Job} from './job.model';
import {FormatService} from './format.service';
import {ErrorMessage} from './errorMessage';
import {Company} from './company.model';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  job: Job = null;
  user: User = null;
  company: Company = null;

  startDate: String = '';
  endDate: String = '';
  validUntil: String = '';
  confirmPassword = '';

  errorFree: boolean;
  error: ErrorMessage;

  constructor(
    private format: FormatService,
  ) { }

  /**
   *  Handles complete validation of a user login item.
   *  Requires user object with all current user details entered by user.
   *  First, remove red alert-style from all related elements to reset them.
   *  (Due to possible errors from previous form submission that were faulty).
   *  Reset the error (removes user feedback messages) and errorFree boolean.
   *  Check all required conditions for the user item to be valid.
   *  Should only one check fail, errorFree gets set to false to prevent submission.
   *  After all conditions have been checked, errorFree returns the result.
   *
   *  @param user               User object containing all details entered by user.
   */
  validateUserLogin(user: User){
    let elements = [
      'email',
      'password'
    ];
    for (let i = 0; i < elements.length; i++) {
      this.format.removeError(elements[i]);
    }
    this.error = new ErrorMessage();
    this.errorFree = true;

    this.user = user;
    this.userEmailEmpty();
    this.userPasswordEmpty();

    return this.errorFree;
  }

  /**
   *  Handles complete validation of a user item.
   *  Requires user object with all current user details entered by user.
   *  First, remove red alert-style from all related elements to reset them.
   *  (Due to possible errors from previous form submission that were faulty).
   *  Reset the error (removes user feedback messages) and errorFree boolean.
   *  Check all required conditions for the user item to be valid.
   *  Should only one check fail, errorFree gets set to false to prevent submission.
   *  After all conditions have been checked, errorFree returns the result.
   *
   *  @param user               User object containing all details entered by user.
   *  @param confirmPassword    Confirm Password that must match password
   */
  validateUserItem(user: User, confirmPassword: string){
    let elements = [
      'email',
      'password',
      'confirmPassword'
    ];
    for (let i = 0; i < elements.length; i++) {
      this.format.removeError(elements[i]);
    }
    this.error = new ErrorMessage();
    this.errorFree = true;

    this.user = user;
    this.confirmPassword = confirmPassword;
    this.userEmailEmpty();
    this.userPasswordEmpty();
    this.userConfirmPasswordEmpty();
    this.userPasswordNotEqual();

    return this.errorFree;
  }

  /**
   *  Handles complete validation of a registration (user & company) item.
   *  Requires registration object with all current user & company details entered by user.
   *  First, remove red alert-style from all related elements to reset them.
   *  (Due to possible errors from previous form submission that were faulty).
   *  Reset the error (removes user feedback messages) and errorFree boolean.
   *  Check all required conditions for the registration item to be valid.
   *  Should only one check fail, errorFree gets set to false to prevent submission.
   *  After all conditions have been checked, errorFree returns the result.
   *
   *  @param user               User object containing all details entered by user.
   *  @param company            Company object containing all details entered by user.
   *  @param confirmPassword    Confirm Password that must match password
   */
  validateRegistration(user: User, company: Company, confirmPassword: string){
    let elements = [
      'email',
      'password',
      'confirmPassword',
      'name',
      'description',
      'streetHouse',
      'street',
      'postcodeCity',
      'postcode',
      'city',
      'contactName'
    ];
    for (let i = 0; i < elements.length; i++) {
      this.format.removeError(elements[i]);
    }
    this.error = new ErrorMessage();
    this.errorFree = true;

    this.user = user;
    this.company = company;
    this.confirmPassword = confirmPassword;
    this.userEmailEmpty();
    this.userPasswordEmpty();
    this.userConfirmPasswordEmpty();
    this.userPasswordNotEqual();
    this.companyNameEmpty();
    this.companyDescriptionEmpty();
    this.companyStreetEmpty();
    this.companyPostcodeEmpty();
    this.companyPostcodeNumber();
    this.companyPostcodeNumberLow();
    this.companyPostcodeNumberHigh();
    this.companyCityEmpty();
    this.companyContactNameEmpty();

    return this.errorFree;
  }

  /**
   *  Handles complete validation of a company item.
   *  Requires company object with all current company details entered by user.
   *  First, remove red alert-style from all related elements to reset them.
   *  (Due to possible errors from previous form submission that were faulty).
   *  Reset the error (removes user feedback messages) and errorFree boolean.
   *  Check all required conditions for the company item to be valid.
   *  Should only one check fail, errorFree gets set to false to prevent submission.
   *  After all conditions have been checked, errorFree returns the result.
   *
   *  @param company            Company object containing all details entered by user.
   */
  validateCompanyItem(company: Company) {
    let elements = [
      'name',
      'description',
      'streetHouse',
      'street',
      'postcodeCity',
      'postcode',
      'city',
      'contactName'
    ];
    for (let i = 0; i < elements.length; i++) {
      this.format.removeError(elements[i]);
    }
    this.error = new ErrorMessage();
    this.errorFree = true;

    this.company = company;
    this.companyNameEmpty();
    this.companyDescriptionEmpty();
    this.companyStreetEmpty();
    this.companyPostcodeEmpty();
    this.companyPostcodeNumber();
    this.companyPostcodeNumberLow();
    this.companyPostcodeNumberHigh();
    this.companyCityEmpty();
    this.companyContactNameEmpty();

    return this.errorFree;
  }

  /**
   *  Handles the complete validation of a job item.
   *  Requires the job object with all current job details entered by user.
   *  Also requires startDate, endDate and validUntil as strings.
   *  First, remove red alert-style from all related elements to reset them.
   *  (Due to possible errors from previous form submissions that were faulty).
   *  Reset the error (removes user feedback messages) and errorFree boolean.
   *  Check all required conditions for the job item to be valid.
   *  Should only one check fail, errorFree gets set to false to prevent submission.
   *  After all conditions have been checked, errorFree returns the result.
   *
   *  @param job            Job object containing all details entered by user.
   *  @param startDate      Start date as a string formatted like DD.MM.YYYY
   *  @param endDate        End date as a string formatted like DD.MM.YYYY
   *  @param validUntil     Valid until date as a string formatted like DD.MM.YYYY
   */
  validateJobItem(job: Job, startDate: String, endDate: String, validUntil: String) {
    let elements = [
      'title',
      'description',
      'skills',
      'workload',
      'workloadMin',
      'workloadMax',
      'languages',
      'firstLanguage',
      'streetHouse',
      'street',
      'postcodeCity',
      'postcode',
      'city',
      'salaryType',
      'startDate',
      'endDate',
      'validUntil'
    ];
    for (let i = 0; i < elements.length; i++) {
      this.format.removeError(elements[i]);
    }
    this.error = new ErrorMessage();
    this.errorFree = true;

    this.job = job;
    this.startDate = startDate;
    this.endDate = endDate;
    this.validUntil = validUntil;
    this.jobTitleEmpty();
    this.jobDescriptionEmpty();
    this.jobWorkloadMinEmpty();
    this.jobWorkloadMinNumber();
    this.jobWorkloadMinLow();
    this.jobWorkloadMinHigh();
    this.jobWorkloadMaxEmpty();
    this.jobWorkloadMaxNumber();
    this.jobWorkloadMaxLow();
    this.jobWorkloadMaxHigh();
    this.jobWorkloadMaxRange();
    this.jobSkillEmpty();
    this.jobLanguageEmpty();
    this.jobStartDateFormat();
    this.jobEndDateFormat();
    this.jobValidUntilEmpty();
    this.jobValidUntilFormat();
    this.jobStreetEmpty();
    this.jobPostcodeEmpty();
    this.jobPostcodeNumber();
    this.jobPostcodeLow();
    this.jobPostcodeHigh();
    this.jobCityEmpty();
    this.jobSalaryTypeEmpty();

    return this.errorFree;
  }

  /**
   *  Returns the error after a form has been validated.
   *  The error object stores all results from the validation
   *  and knows exactly which checks failed or passed.
   *  Used to display error messages for user feedback.
   */
  getErrorMessage() {
    return this.error;
  }

  /**
   *  Each of the following methods contains one validation to check
   *  a form field for a certain condition that needs to be true.
   *  If one validation fails, the corresponding HTML-element gets styled red
   *  and the error message used to give user feedback gets set to true.
   *  Since the form will not be free of errors, errorFree gets set to false,
   *  ensuring that the filled out form will not be submitted.
   */

  // Title cannot be empty
  jobTitleEmpty() {
    if (this.format.isEmpty(this.job.title)) {
      this.format.addError("title");
      this.error.titleEmpty = true;
      this.errorFree = false;
    }
  }

  // Description cannot be empty
  jobDescriptionEmpty() {
    if (this.format.isEmpty(this.job.description)) {
      this.format.addError("description");
      this.error.descriptionEmpty = true;
      this.errorFree = false;
    }
  }

  // Workload Minimum cannot be empty
  jobWorkloadMinEmpty() {
    if (this.job.workloadMin === null || this.format.isEmpty(this.job.workloadMin.toString())) {
      this.format.addError("workload");
      this.format.addError("workloadMin");
      this.error.workloadMin = true;
      this.error.workloadMinEmpty = true;
      this.errorFree = false;
    }
  }

  // Workload Minimum must be number between 1 and 100
  jobWorkloadMinNumber() {
    if (!(this.job.workloadMin >= 1 && this.job.workloadMin <= 100)) {
      this.format.addError("workload");
      this.format.addError("workloadMin");
      this.error.workloadMin = true;
      this.error.workloadMinNumber = true;
      this.errorFree = false;
    }
  }

  // Workload Minimum cannot be smaller than 1
  jobWorkloadMinLow() {
    if (this.job.workloadMin < 1) {
      this.format.addError("workload");
      this.format.addError("workloadMin");
      this.error.workloadMin = true;
      this.error.workloadMinLow = true;
      this.errorFree = false;
    }
  }

  // Workload Minimum cannot be greater than 100
  jobWorkloadMinHigh() {
    if (this.job.workloadMin > 100) {
      this.format.addError("workload");
      this.format.addError("workloadMin");
      this.error.workloadMin = true;
      this.error.workloadMinHigh = true;
      this.errorFree = false;
    }
  }

  // Workload Maximum cannot be empty
  jobWorkloadMaxEmpty() {
    if (this.job.workloadMax === null || this.format.isEmpty(this.job.workloadMax.toString())) {
      this.format.addError("workload");
      this.format.addError("workloadMax");
      this.error.workloadMax = true;
      this.error.workloadMaxEmpty = true;
      this.errorFree = false;
    }
  }

  // Workload Maximum must be number between 1 and 100
  jobWorkloadMaxNumber() {
    if (!(this.job.workloadMax >= 1 && this.job.workloadMax <= 100)) {
      this.format.addError("workload");
      this.format.addError("workloadMax");
      this.error.workloadMax = true;
      this.error.workloadMaxNumber = true;
      this.errorFree = false;
    }
  }

  // Workload Maximum cannot be smaller than 1
  jobWorkloadMaxLow() {
    if (this.job.workloadMax < 1) {
      this.format.addError("workload");
      this.format.addError("workloadMax");
      this.error.workloadMax = true;
      this.error.workloadMaxLow = true;
      this.errorFree = false;
    }
  }

  // Workload Maximum cannot be greater than 100
  jobWorkloadMaxHigh() {
    if (this.job.workloadMax > 100) {
      this.format.addError("workload");
      this.format.addError("workloadMax");
      this.error.workloadMax = true;
      this.error.workloadMaxHigh = true;
      this.errorFree = false;
    }
  }

  // Workload Minimum must be smaller than or equal Maximum
  jobWorkloadMaxRange() {
    if ((this.job.workloadMin - this.job.workloadMax) > 0) {
      this.format.addError("workload");
      this.format.addError("workloadMax");
      this.error.workloadMax = true;
      this.error.workloadMaxRange = true;
      this.errorFree = false;
    }
  }

  // Skills cannot be empty
  jobSkillEmpty() {
    if (this.format.isEmpty(this.job.skills)) {
      this.format.addError("skills");
      this.error.skillsEmpty = true;
      this.errorFree = false;
    }
  }

  // Language cannot be empty
  jobLanguageEmpty() {
    if (this.format.isEmpty(this.job.firstLanguage)) {
      this.format.addError("languages");
      this.format.addError("firstLanguage");
      this.error.languageEmpty = true;
      this.errorFree = false;
    }
  }

  // Start Date must be in valid Format (DD.MM.YYYY)
  jobStartDateFormat() {
    if (!(this.startDate === null || this.startDate === '') && !this.startDate.match("([0-3]?\\d\\.{1})([01]?\\d\\.{1})([12]{1}\\d{3}\\.?)")) {
      this.format.addError("startDate");
      this.error.startDateFormat = true;
      this.errorFree = false;
    }
  }

  // End Date must be in valid Format (DD.MM.YYYY)
  jobEndDateFormat() {
    if (!(this.endDate === null || this.endDate === '') && !this.endDate.match("([0-3]?\\d\\.{1})([01]?\\d\\.{1})([12]{1}\\d{3}\\.?)")) {
      this.format.addError("endDate");
      this.error.endDateFormat = true;
      this.errorFree = false;
    }
  }

  // Valid until cannot be empty
  jobValidUntilEmpty() {
    if (this.format.isEmpty(this.validUntil.toString())) {
      this.format.addError("validUntil");
      this.error.validUntil = true;
      this.error.validUntilEmpty = true;
      this.errorFree = false;
    }
  }

  // Valid Until must be in valid Format (DD.MM.YYYY)
  jobValidUntilFormat() {
    if (!(this.validUntil === null) && !this.validUntil.match("([0-3]?\\d\\.{1})([01]?\\d\\.{1})([12]{1}\\d{3}\\.?)")) {
      this.format.addError("validUntil");
      this.error.validUntil = true;
      this.error.validUntilFormat = true;
      this.errorFree = false;
    }
  }

  // Street cannot be empty
  jobStreetEmpty() {
    if (this.format.isEmpty(this.job.street)) {
      this.format.addError("streetHouse");
      this.format.addError("street");
      this.error.streetEmpty = true;
      this.errorFree = false;
    }
  }

  // Postcode cannot be empty
  jobPostcodeEmpty() {
    if (this.job.postcode === null || this.format.isEmpty(this.job.postcode.toString())) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.postcode = true;
      this.error.postcodeEmpty = true;
      this.errorFree = false;
    }
  }

  // Postcode must be a number between 1'000 and 9'999
  jobPostcodeNumber() {
    if (!(this.job.postcode >= 1000 && this.job.postcode <= 9999)) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.postcode = true;
      this.error.postcodeNumber = true;
      this.errorFree = false;
    }
  }

  // Postcode must be greater or equal than 1'000
  jobPostcodeLow() {
    if (this.job.postcode < 1000) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.postcode = true;
      this.error.postcodeLow = true;
      this.errorFree = false;
    }
  }

  // Postcode must be lower than 10'000
  jobPostcodeHigh() {
    if (this.job.postcode > 9999) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.postcode = true;
      this.error.postcodeHigh = true;
      this.errorFree = false;
    }
  }

  // City cannot be empty
  jobCityEmpty() {
    if (this.format.isEmpty(this.job.city)) {
      this.format.addError("postcodeCity");
      this.format.addError("city");
      this.error.cityEmpty = true;
      this.errorFree = false;
    }
  }

  // Salary Type cannot be empty
  jobSalaryTypeEmpty() {
    if (this.format.isEmpty(this.job.salaryType)) {
      this.format.addError("salaryType");
      this.error.salaryTypeEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Name cannot be empty
  companyNameEmpty() {
    if (this.format.isEmpty(this.company.name)) {
      this.format.addError("name");
      this.error.companyNameEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Description cannot be empty
  companyDescriptionEmpty() {
    if (this.format.isEmpty(this.company.description)) {
      this.format.addError("description");
      this.error.companyDescriptionEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Street cannot be empty
  companyStreetEmpty() {
    if (this.format.isEmpty(this.company.street)) {
      this.format.addError("streetHouse");
      this.format.addError("street");
      this.error.companyStreetEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Postcode cannot be empty
  companyPostcodeEmpty() {
    if (this.company.postcode === null || this.format.isEmpty(this.company.postcode.toString())) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.companyPostcode = true;
      this.error.companyPostcodeEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Postcode must be number between 1000 and 9999
  companyPostcodeNumber() {
    if (!(this.company.postcode >= 1000 && this.company.postcode <= 9999)) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.companyPostcode = true;
      this.error.companyPostcodeNumber = true;
      this.errorFree = false;
    }
  }

  // Company Postcode must be number >= 1000
  companyPostcodeNumberLow() {
    if (this.company.postcode < 1000) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.companyPostcode = true;
      this.error.companyPostcodeNumberLow = true;
      this.errorFree = false;
    }
  }

  // Company Postcode must be number <= 10'000
  companyPostcodeNumberHigh() {
    if (this.company.postcode > 9999) {
      this.format.addError("postcodeCity");
      this.format.addError("postcode");
      this.error.companyPostcode = true;
      this.error.companyPostcodeNumberHigh = true;
      this.errorFree = false;
    }
  }

  // Company City cannot be empty
  companyCityEmpty() {
    if (this.format.isEmpty(this.company.city)) {
      this.format.addError("postcodeCity");
      this.format.addError("city");
      this.error.companyCityEmpty = true;
      this.errorFree = false;
    }
  }

  // Company Contact Name cannot be empty
  companyContactNameEmpty() {
    if (this.format.isEmpty(this.company.contactName)) {
      this.format.addError("contactName");
      this.error.companyContactNameEmpty = true;
      this.errorFree = false;
    }
  }

  // User E-Mail cannot be empty
  userEmailEmpty() {
    if (this.format.isEmpty(this.user.email)) {
      this.format.addError("email");
      this.error.userEmailEmpty = true;
      this.errorFree = false;
    }
  }

  // User Password cannot be empty
  userPasswordEmpty() {
    if (this.format.isEmpty(this.user.password)) {
      this.format.addError("password");
      this.error.userPasswordEmpty = true;
      this.errorFree = false;
    }
  }

  // User Confirm Password cannot be empty
  userConfirmPasswordEmpty() {
    if (this.format.isEmpty(this.confirmPassword)) {
      this.format.addError("confirmPassword");
      this.error.userConfirmPassword = true;
      this.error.userConfirmPasswordEmpty = true;
      this.errorFree = false;
    }
  }

  // User Password and Confirm Password must match
  userPasswordNotEqual() {
    if (this.user.password != this.confirmPassword) {
      this.format.addError("confirmPassword");
      this.error.userConfirmPassword = true;
      this.error.userPasswordsNotEqual = true;
      this.errorFree = false;
    }
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from './user.model';
import {ToastrService} from 'ngx-toastr';
import {FormatService} from './format.service';
import {Company} from './company.model';
import {Job} from './job.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  backendURL: string = 'http://localhost:3000/';
  userId: string;
  userToken: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private format: FormatService
  ) { }



  /*************************************************************************
      JOB LIST
   ************************************************************************/

  /**
   *  GET-Request to fetch all approved job postings.
   *  Returns the observable of the request.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobListAll() {
    return this.httpClient.get(this.backendURL + 'jobitem');
  }

  /**
   *  GET-Request to fetch all approved job postings that match the search term.
   *  Requires the search term. Returns the observable of the request.
   *
   *  @param {string} searchTerm      Term to be searched after.
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobListSearch(searchTerm: string) {
    return this.httpClient.get(this.backendURL + 'jobitem/search/' + searchTerm);
  }

  /**
   *  GET-Request to fetch all approved job postings that match the filter values.
   *  Requires the filter values. Returns the observable of the request.
   *
   *  @param {string} filterValues    Values to be filtered after.
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobListFilter(filterValues: string) {
    return this.httpClient.post(this.backendURL + 'jobitem/filer', {
      filterValues
    });
  }

  jobListCompany(companyId: number) {
    return this.httpClient.get(this.backendURL + 'jobitem/ofCompany/' + companyId);
  }



  /*************************************************************************
      JOB DETAILS
   ************************************************************************/

  /**
   *  GET-Request to fetch all details of the job posting from the given ID.
   *  Requires the jobId. Returns the observable of the request.
   *
   *  @param {number} jobId           ID of job posting to get details from.
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobDetails(jobId: number) {
    return this.httpClient.get(this.backendURL + 'jobitem/' + jobId);
  }

  /**
   *  GET-Request to fetch all details of the company from the given ID.
   *  Requires the companyId. Returns the observable of the request.
   *
   *  @param {number} companyId       ID of company to get details from.
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  companyDetails(companyId: number) {
    return this.httpClient.get(this.backendURL + 'company/' + companyId);
  }



  /*************************************************************************
      JOB CREATE
   ************************************************************************/

  /**
   *  POST-Request to create a new job posting. Only for verified users.
   *  Requires userId and userToken for verification and jobData with all details.
   *
   *  @param {Job} jobData            Job object with all required details.
   *  @param startDate                Start date as string entered by user
   *  @param endDate                  End date as string entered by user
   *  @param validUntil               Valid until date as string entered by user
   */
  jobCreate(jobData: Job, startDate: String, endDate: String, validUntil: String) {
    this.getLocalStorage();
    this.httpClient.post(this.backendURL + 'jobitem/' + this.userId + '/' + this.userToken, {
      'title': jobData.title,
      'description': jobData.description,
      'startDate': this.format.dateFromStringToMillisecond(startDate),
      'endDate': this.format.dateFromStringToMillisecond(endDate),
      'validUntil': this.format.dateFromStringToMillisecond(validUntil),
      'workloadMin': jobData.workloadMin,
      'workloadMax': jobData.workloadMax,
      'firstLanguage': jobData.firstLanguage,
      'secondLanguage': jobData.secondLanguage,
      'street': jobData.street,
      'houseNumber': jobData.houseNumber,
      'postcode': jobData.postcode,
      'city': jobData.city,
      'salaryType': jobData.salaryType,
      'salaryAmount': jobData.salaryAmount,
      'skills': jobData.skills
    }).subscribe(
      res => {
        this.toastr.success('Now in review by our admin', 'Job creation successful');
        this.router.navigate(['/my-account/job-postings']);
      },
      err => {
        this.toastr.error(err.error.message, 'Job creation failed');
      }
    )
  }



  /*************************************************************************
      JOB UPDATE
   ************************************************************************/

  /**
   *  PUT-Request to update job posting. Only for users that own this job posting.
   *  Requires userId and userToken for verification and jobData with all details.
   *
   *  @param {Job} jobData            Job object with all required details.
   *  @param startDate                Start date as string entered by user
   *  @param endDate                  End date as string entered by user
   *  @param validUntil               Valid until date as string entered by user
   */
  jobUpdate(jobData: Job, startDate: String, endDate: String, validUntil: String){
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'jobitem/' + jobData.id + '/' + this.userId + '/' + this.userToken, {
      'title': jobData.title,
      'description': jobData.description,
      'startDate': this.format.dateFromStringToMillisecond(startDate),
      'endDate': this.format.dateFromStringToMillisecond(endDate),
      'validUntil': this.format.dateFromStringToMillisecond(validUntil),
      'workloadMin': jobData.workloadMin,
      'workloadMax': jobData.workloadMax,
      'firstLanguage': jobData.firstLanguage,
      'secondLanguage': jobData.secondLanguage,
      'street': jobData.street,
      'houseNumber': jobData.houseNumber,
      'postcode': jobData.postcode,
      'city': jobData.city,
      'salaryType': jobData.salaryType,
      'salaryAmount': jobData.salaryAmount,
      'skills': jobData.skills
    }).subscribe(
      res => {
        this.router.navigate(['my-account/job-postings']);
        this.toastr.success('', 'Job updated successfully');
      },
      err => {
        this.toastr.error(err.error.message, 'Job update failed');
      }
    )
  }



  /*************************************************************************
      USER LOGIN
   ************************************************************************/

  /**
   *  POST-Request for logging in an existing user using e-mail and password.
   *  Requires a User object containing email and password.
   *
   *  @param {User} userData          User object with all required details.
   */
  userLogin(userData: User) {
    this.httpClient.post<any>(this.backendURL + 'user/token', {
      'email': userData.email,
      'password': userData.password
    }).subscribe(
      res => {
        localStorage.setItem('user-id', res.id);
        localStorage.setItem('user-token', res.token);
        // TODO - Improve Admin verification with isAdmin-request
        localStorage.setItem('isAdmin', res.isAdmin);
        this.toastr.success(userData.email, 'Sign In successful');
        this.router.navigate(['']);
      },
      err => {
        this.toastr.error(err.error.message, 'Sign In failed');
        if(err.error.message == 'Wrong Password'){
          this.format.addError('password');
        } else if(err.error.message == 'User not found'){
          this.format.addError('email');
        }
      }
    );
  }



  /*************************************************************************
      USER REGISTRATION
   ************************************************************************/

  /**
   * POST-Request for registering a new user with the given details for
   * User (e-mail and password) and all company related details.
   *
   * @param {User} userData           User object with all required details.
   * @param {Company} companyData     Company object with all required details.
   */
  userRegister(userData: User, companyData: Company) {
    this.httpClient.post(this.backendURL + 'company', {
      'email': userData.email,
      'password': userData.password,
      'companyName': companyData.name,
      'companyLogoURL': companyData.logo,
      'companyStreet': companyData.street,
      'companyHouseNumber': companyData.houseNumber,
      'companyPostcode': companyData.postcode,
      'companyCity': companyData.city,
      'contactName': companyData.contactName,
      'contactEmail': companyData.contactEmail,
      'contactPhone': companyData.contactPhone,
      'companyWebsite': companyData.website,
      'companyDescription': companyData.description
    }).subscribe(
      res => {
        this.toastr.success('Now in review by our admin', 'Registration successful');
        this.router.navigate(['']);
      },
      err => {
        this.toastr.error(err.error.message, 'Registration failed');
        // TODO - Analyze error-message and mark fields
      }
    );
  }



  /*************************************************************************
      ADMIN
   ************************************************************************/

  /**
   *  GET-Request to fetch all company entries from the database no matter what status they have.
   *  Only available for Admin. Requires userId and userToken for verification. Returns the observable.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  companyFetchAll() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'admin/allCompanies/' + this.userId + '/' + this.userToken);
  }

  /**
   *  GET-Request to fetch all company entries from the database that are unverified.
   *  Only available for Admin. Requires userId and userToken for verification. Returns the observable.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  companyFetchUnverified() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'admin/unverifiedCompanies/' + this.userId + '/' + this.userToken);
  }

  /**
   *  PUT-Request to update the featured status of a company. Only available for Admin.
   *  Requires userId and userToken for verification. Requires companyId and new featured status (boolean).
   *
   *  @param companyId                ID of the company who's featured status gets changed
   *  @param featured                 New featured status (TRUE = featured, FALSE = unfeatured)
   */
  companyFeaturedStatus(companyId: number, featured: boolean) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/featureCompany/' + companyId + '/' + this.userId + '/' + this.userToken, {
      'feature': featured
    }).subscribe(
      res => {
        this.toastr.success('', 'Company Status updated successfully');
      }
    );
  }

  /**
   *  PUT-Request to approve an unverified company. Only available for Admin.
   *  Requires userId and userToken for verification. Requires userId of approved company.
   *
   *  @param {number} companyId       ID of company to be approved.
   */
  companyApprove(companyId: number) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/verify/' + companyId + '/' + this.userId + '/' + this.userToken, {
      'verify': true
    }).subscribe(
      res => {
        this.toastr.success('', 'Company approved successfully');
      }
    );
  }

  /**
   *  PUT-Request to deny an unverified company. Only available for Admin.
   *  Requires userId and userToken for verification.
   *  Requires userId of denied company and message from Admin with explanation.
   *
   *  @param {number} companyId      ID of company to be denied.
   *  @param {string} adminMessage   Reasons why company was denied.
   */
  companyDeny(companyId: number, adminMessage: string) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/verify/' + companyId + '/' + this.userId + '/' + this.userToken, {
      'verify': false,
      'message': adminMessage
    }).subscribe(
      res => {
        this.toastr.success('', 'Company denied successfully');
      }
    );
  }

  /**
   *  Deletes a company and all its related database entries such as users and job postings. Only available for Admin.
   *  Requires userId and userToken for verification. Requires ID of the company that gets deleted.
   *
   *  @param companyId                 ID of the company that gets deleted
   */
  companyDelete(companyId: number) {
    this.getLocalStorage();
    this.httpClient.delete(this.backendURL + 'admin/deleteCompany/' + companyId + '/' + this.userId + '/' + this.userToken)
      .subscribe(
        res => {
          this.toastr.success('', 'Company deleted successfully');
        }
      );
  }

  /**
   *  GET-Request to fetch all job posting entries from the database no matter what status they have.
   *  Only available for Admin. Requires userId and userToken for verification. Returns the observable.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobFetchAll() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'admin/allJobItems/' + this.userId + '/' + this.userToken);
  }

  /**
   *  GET-Request to fetch all unapproved job postings. Only available for Admin.
   *  Requires userId and userToken for verification. Returns the observable of the request.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  jobFetchUnaccepted() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'admin/unacceptedJobItems/' + this.userId + '/' + this.userToken);
  }

  /**
   *  PUT-Request to update the featured status of a job item. Only available for Admin.
   *  Requires userId and userToken for verification. Requires jobId and new featured status (boolean).
   *
   *  @param jobId                    ID of the job item who's featured status gets changed
   *  @param featured                 New featured status (TRUE = featured, FALSE = unfeatured)
   */
  jobFeaturedStatus(jobId: number, featured: boolean) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/featureJobitem/' + jobId + '/' + this.userId + '/' + this.userToken, {
      'feature': featured
    }).subscribe(
      res => {
        this.toastr.success('', 'Job Status updated successfully');
      }
    );
  }

  /**
   *  PUT-Request to approve an unapproved job posting. Only available for Admin.
   *  Requires userId and userToken for verification. Requires jobId of approved job posting.
   *
   *  @param {number} jobId           ID of job posting to be approved.
   */
  jobApprove(jobId: number) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
      'accept': true
    }).subscribe(
      res => {
        this.toastr.success('', 'Job accepted successfully');
      }
    );
  }

  /**
   *  PUT-Request to deny an unapproved job posting. Only available for Admin.
   *  Requires userId and userToken for verification.
   *  Requires jobId of denied job posting and message from Admin with explanation.
   *
   *  @param {number} jobId           ID of job posting to be denied.
   *  @param {string} adminMessage    Reasons why job posting was denied.
   */
  jobDeny(jobId: number, adminMessage: string) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'admin/accept/' + jobId + '/' + this.userId + '/' + this.userToken, {
      'accept': false,
      'message': adminMessage
    }).subscribe(
      res => {
        this.toastr.success('', 'Job denied successfully');
      }
    );
  }

  /**
   *  Deletes a job item from the database. Only available for Admin.
   *  Requires userId and userToken for verification. Requires ID of the job item that gets deleted.
   *
   *  @param jobId                   ID of the job item that gets deleted
   */
  jobDelete(jobId: number) {
    this.getLocalStorage();
    this.httpClient.delete(this.backendURL + 'admin/deleteJobItem/' + jobId + '/' + this.userId + '/' + this.userToken)
      .subscribe(
        res => {
          this.toastr.success('', 'Job deleted successfully');
        }
      );
  }



  /*************************************************************************
      MY ACCOUNT / ACCOUNT SETTINGS
   ************************************************************************/

  /**
   *  GET-Request to load all current user data for the user to be edited.
   *  Requires userId and userToken for verification. Returns the observable of the request.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  userDataLoad() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'user/' + this.userId + '/' + this.userToken);
  }

  /**
   *  PUT-Request to update user data. Only available for logged in users.
   *  Requires userId and userToken for verification and userData with new details.
   *
   *  @param {User} userData          New details of user to be stored in database.
   */
  userDataUpdate(userData: User) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'user/' + this.userId + '/' + this.userToken, {
      'email': userData.email,
      'password': userData.password
    }).subscribe(
      (res) => {
        this.toastr.success('', 'User update successful');
      },
      (err) => {
        this.toastr.error(err.error.message, 'User update failed');
      }
    );
  }

  /**
   *  DELETE-Request to remove all user data any any company and job posting data along with it.
   *  Affects currently logged in user and requires confirmation before being sent.
   *  Requires userId and userToken for verification.
   */
  userDataDelete() {
    this.getLocalStorage();
    this.httpClient.delete(this.backendURL + 'user/' + this.userId + '/' + this.userToken)
      .subscribe(
        res => {
          this.toastr.warning('', 'The current user has been deleted');
          localStorage.removeItem('user-id');
          localStorage.removeItem('user-token');
          localStorage.removeItem('isAdmin');
          this.router.navigate(['']).then();
        },
        err => {
          this.toastr.error(err.error.message, 'User deletion failed');
        }
      );
  }

  /**
   *  GET-Request to load all current company data for the user to be edited.
   *  Requires userId and userToken for verification. Returns the observable of the request.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  companyDataLoad() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'company/' + this.userId + '/' + this.userToken);
  }

  /**
   *  PUT-Request to update company data. Only available for logged in users.
   *  Requires userId and userToken for verification and userData/companyData with new details.
   *
   *  @param {User} userData          New details of user to be stored in database.
   *  @param {Company} companyData    New details of company to be stored in database.
   */
  companyDataUpdate(userData: User, companyData: Company) {
    this.getLocalStorage();
    this.httpClient.put(this.backendURL + 'company/' + this.userId + '/' + this.userToken, {
      'email': userData.email,
      'password': userData.password,
      'companyName': companyData.name,
      'companyLogoURL': companyData.logo,
      'companyStreet': companyData.street,
      'companyHouseNumber': companyData.houseNumber,
      'companyPostcode': companyData.postcode,
      'companyCity': companyData.city,
      'contactName': companyData.contactName,
      'contactEmail': companyData.contactEmail,
      'contactPhone': companyData.contactPhone,
      'companyWebsite': companyData.website,
      'companyDescription': companyData.description
    }).subscribe(
      res => {
        this.toastr.success('', 'Company update successful');
      },
      err => {
        this.toastr.error(err.error.message, 'Company update failed');
      }
    );
  }



  /*************************************************************************
      MY ACCOUNT / MY JOB POSTINGS
   ************************************************************************/

  /**
   *  GET-Request to fetch all your personal job postings.
   *  Requires userId and userToken for verification.
   *  Returns the observable of the request.
   *
   *  @returns {Observable<Object>}   Observable of GET-Request.
   */
  loadMyJobs() {
    this.getLocalStorage();
    return this.httpClient.get(this.backendURL + 'jobItem/' + this.userId + '/' + this.userToken);
  }

  /**
   *  DELETE-Request to remove one of your personal job postings.
   *  Requires userId and userToken for verification.
   *  Requires jobId of the about to be deleted job posting.
   *
   *  @param {number} jobId           ID of job posting to be deleted.
   */
  deleteMyJob(jobId: number) {
    this.getLocalStorage();
    this.httpClient.delete(this.backendURL + 'jobitem/' + jobId + '/' +  this.userId + '/' + this.userToken)
      .subscribe();
  }



  /*************************************************************************
      GENERAL
   ************************************************************************/

  /**
   *  Gets the current userId and userToken from LocalStorage.
   */
  getLocalStorage() {
    this.userId = localStorage.getItem('user-id');
    this.userToken = localStorage.getItem('user-token');
  }

  /**
   *  Signs out the current user by deleting the user items in LocalStorage.
   */
  onSignOut() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-token');
    localStorage.removeItem('isAdmin');
    this.toastr.warning('', 'You are now signed out');
    this.router.navigate(['']).then();
  }

  /**
   *  Checks if the current user has a token (and is therefore logged in)
   *
   *  @returns {boolean}              True if logged in; False otherwise
   */
  checkIfUser() {
    return localStorage.getItem('user-token');
  }

  checkIfAccess() {
    if(!localStorage.getItem('user-token')){
      this.router.navigate(['']).then();
      this.toastr.error('You need to be logged in', 'Access denied');
    }
  }

  /**
   *  Checks if the current user is an Admin.
   *
   *  @returns {boolean}              True if Admin; False otherwise
   */
  checkIfAdmin() {
    /* TODO - Check with backend if current userId & userToken is admin */
    let userType: string = localStorage.getItem('isAdmin');
    return (userType == 'true');
  }
}

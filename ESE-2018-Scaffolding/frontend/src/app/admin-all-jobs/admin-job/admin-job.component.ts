import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Job} from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.css']
})
export class AdminJobComponent {

  @Input()
  jobEntry: Job;

  @Output()
  jobApproved = new EventEmitter<number>();
  @Output()
  jobDenied = new EventEmitter<number>();
  @Output()
  jobFeatured = new EventEmitter<number>();
  @Output()
  jobUnfeatured = new EventEmitter<number>();
  @Output()
  jobDeleted = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve a job by changing its state to approved.
   */
  onApprovedJob() {
    this.jobApproved.emit(this.jobEntry.id);
    this.jobEntry.accepted = true;
  }

  /**
   *  Emits an event to deny a job by changing its state to denied.
   */
  onDeniedJob() {
    this.jobDenied.emit(this.jobEntry.id);
    this.jobEntry.accepted = false;
  }

  /**
   *  Emits an event to feature a job.
   */
  onFeatureJob() {
    this.jobFeatured.emit(this.jobEntry.id);
    this.jobEntry.featured = true;
  }

  /**
   *  Emits an event to unfeature a job.
   */
  onUnfeatureJob() {
    this.jobUnfeatured.emit(this.jobEntry.id);
    this.jobEntry.featured = false;
  }

  /**
   *  Emits an event to delete a job.
   */
  onDeleteJob() {
    this.jobDeleted.emit(this.jobEntry.id);
  }
}

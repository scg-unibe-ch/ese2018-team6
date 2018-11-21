import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Job} from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent {

  @Input()
  jobSubmissionEntry: Job;

  @Output()
  jobSubmissionApproved = new EventEmitter<number>();
  @Output()
  jobSubmissionDenied = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve the job submission with the given jobId.
   */
  onApprovedJobSubmission() {
    this.jobSubmissionApproved.emit(this.jobSubmissionEntry.id);
  }

  /**
   *  Emits an event to deny the job submission with the given jobId.
   */
  onDeniedJobSubmission() {
    this.jobSubmissionDenied.emit(this.jobSubmissionEntry.id);
  }
}

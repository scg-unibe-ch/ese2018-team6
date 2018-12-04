import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Job} from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent {

  @Input()
  jobEntry: Job;

  @Output()
  jobApproved = new EventEmitter<number>();
  @Output()
  jobDenied = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve the job submission with the given jobId.
   */
  onApproveJob() {
    this.jobApproved.emit(this.jobEntry.id);
  }

  /**
   *  Emits an event to deny the job submission with the given jobId.
   */
  onDenyJob() {
    this.jobDenied.emit(this.jobEntry.id);
  }
}

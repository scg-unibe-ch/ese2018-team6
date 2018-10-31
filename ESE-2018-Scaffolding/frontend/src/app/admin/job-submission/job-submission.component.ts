import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../job.model';

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent implements OnInit {

  @Input()
  jobSubmissionEntry: Job;

  @Output()
  jobSubmissionApproved = new EventEmitter<Job>();
  @Output()
  jobSubmissionDenied = new EventEmitter<Job>();

  constructor() { }

  ngOnInit() { }

  onApprovedJobSubmission() {
    this.jobSubmissionApproved.emit(this.jobSubmissionEntry);
  }

  // TODO: Send message with reasoning behind denial to applicant.
  onDeniedJobSubmission() {
    this.jobSubmissionDenied.emit(this.jobSubmissionEntry);
  }
}

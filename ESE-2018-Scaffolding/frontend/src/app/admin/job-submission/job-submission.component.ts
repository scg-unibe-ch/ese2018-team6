import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent implements OnInit {

  @Input()
  jobSubmissionEntry: Job;

  @Output()
  jobSubmissionApproved = new EventEmitter<number>();
  @Output()
  jobSubmissionDenied = new EventEmitter<number>();

  constructor(public format: FormatService) { }

  ngOnInit() { }

  onApprovedJobSubmission() {
    this.jobSubmissionApproved.emit(this.jobSubmissionEntry.id);
  }

  onDeniedJobSubmission() {
    this.jobSubmissionDenied.emit(this.jobSubmissionEntry.id);
  }
}

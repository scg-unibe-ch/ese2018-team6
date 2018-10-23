import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-submission',
  templateUrl: './job-submission.component.html',
  styleUrls: ['./job-submission.component.css']
})
export class JobSubmissionComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Job Submission approved - change status in backend accordingly
  onApprovedJobSubmission() { }

  // Job Submission denied - delete submission from backend and write message to user with reason
  onDeniedJobSubmission() { }
}

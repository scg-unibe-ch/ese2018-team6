import { Component, OnInit } from '@angular/core';
import {Job} from '../job.model';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  jobPostingEntry: Job = new Job(
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


  constructor() { }

  ngOnInit() { }

  // TODO Creates new request for backend to create a new job posting with the data from from fields.
  onCreate() {}
}

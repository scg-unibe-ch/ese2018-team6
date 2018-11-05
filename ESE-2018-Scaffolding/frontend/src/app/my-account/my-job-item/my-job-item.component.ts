import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../../job.model';

@Component({
  selector: 'app-my-job-item',
  templateUrl: './my-job-item.component.html',
  styleUrls: ['./my-job-item.component.css']
})
export class MyJobItemComponent implements OnInit {

  @Input()
  myJobData: Job;

  @Output()
  jobSubmissionDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  // TODO Send changes to backend (DELETE JOB POSTING IN DATABASE)
  onDeleteJobItem() {
    this.jobSubmissionDelete.emit(this.myJobData.id);
  }
}

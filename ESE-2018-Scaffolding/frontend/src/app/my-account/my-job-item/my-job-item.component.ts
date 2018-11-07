import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from '../../job.model';
import {Router} from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() { }

  onEditJobItem() {
    this.router.navigate(['/jobs/edit/' + this.myJobData.id])
  }

  onDeleteJobItem() {
    this.jobSubmissionDelete.emit(this.myJobData.id);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Job} from '../../job.model';
import {Router} from '@angular/router';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-my-job-item',
  templateUrl: './my-job-item.component.html',
  styleUrls: ['./my-job-item.component.css']
})
export class MyJobItemComponent {

  @Input()
  myJobData: Job;

  @Output()
  jobSubmissionDelete = new EventEmitter<number>();

  constructor(
    private router: Router,
    public format: FormatService
  ) { }

  /**
   *  Redirects to the edit page of the job posting from the given jobId.
   */
  onEditJobItem() {
    this.router.navigate(['/jobs/edit/' + this.myJobData.id]).then();
  }

  /**
   *  Emits an event to delete the job posting with the given jobId.
   */
  onDeleteJobItem() {
    this.jobSubmissionDelete.emit(this.myJobData.id);
  }
}

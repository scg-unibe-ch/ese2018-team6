import {Component, Input} from '@angular/core';
import {Job} from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent {

  @Input()
  jobData: Job;

  @Input()
  newTab: boolean;

  constructor(
    public format: FormatService
  ) { }
}

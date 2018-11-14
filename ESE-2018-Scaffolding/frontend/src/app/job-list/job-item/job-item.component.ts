import {Component, Input, OnInit } from '@angular/core';
import {Job} from '../../job.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Input()
  jobData: Job;

  constructor(public format: FormatService) { }

  ngOnInit() { }
}

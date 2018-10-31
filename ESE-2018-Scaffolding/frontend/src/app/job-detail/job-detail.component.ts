import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {Job} from '../job.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  /*
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
    null,
  );
  userEntry: User = new User(
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
  );
  */

  // Dummy Data for User and Job to test display layout. TODO DELETE Dummy Data
  jobPostingEntry: Job = new Job(
    1,
    'Java Developer',
    'We\'re looking for a Java developer. Nam lobortis egestas sem, vitae efficitur lectus tincidunt eu. Sed est orci, luctus ac pulvinar et, aliquet eget urna. Cras pharetra turpis a metus semper, non maximus ante malesuada. Fusce varius diam vitae volutpat tincidunt. Donec ac bibendum ligula, non scelerisque purus. Suspendisse scelerisque dolor urna, et fringilla augue scelerisque vitae. Mauris sodales viverra nibh at tincidunt.',
    'Java',
    new Date(2019, 0, 0),
    new Date(2019, 11, 31),
    new Date(2018, 11, 31),
    50,
    100,
    'German, English',
    3000,
    'Bern',
    'Monthly',
    7800
  );

  userEntry: User = new User(
    1,
    'google@gmail.com',
    'password',
    'Google',
    'Company',
    'Hauptstrasse 1',
    8000,
    'Zürich',
    'google.com',
    'Nam lobortis egestas sem, vitae efficitur lectus tincidunt eu. Sed est orci, luctus ac pulvinar et, aliquet eget urna. Cras pharetra turpis a metus semper, non maximus ante malesuada. Fusce varius diam vitae volutpat tincidunt. Donec ac bibendum ligula, non scelerisque purus. Suspendisse scelerisque dolor urna, et fringilla augue scelerisque vitae. Mauris sodales viverra nibh at tincidunt.',
  );

  constructor() { }

  ngOnInit() {
    this.onLoadingData();
  }

  // TODO Fetch the job posting and user data from the backend to display it all on one page.
  onLoadingData() {

  }
}

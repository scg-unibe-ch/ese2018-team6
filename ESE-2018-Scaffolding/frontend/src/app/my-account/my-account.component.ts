import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {User} from '../user.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  //@Input()
  //userEntry: User;

  password: string;
  confirmPassword: string;
  //myJobPostings: Job[] = [];

  // Dummy Data: User TODO: DELETE DUMMY DATA
  userEntry: User = new User (
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

  // Dummy Data: My Job Postings TODO: DELETE DUMMY DATA
  myJobPostings: Job[] = [
    new Job(
      1,
      'Java Developer',
      'We\'re looking for a Java developer',
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
    ),
    new Job(
      2,
      'Web Developer',
      'We want to hire a Web Developer',
      'HTML, CSS, Javascript',
      new Date(2020, 0, 0),
      new Date(2020, 11, 31),
      new Date(2019, 11, 31),
      80,
      100,
      'German, English',
      8000,
      'Zürich',
      'Hourly',
      50
    )
  ];

  constructor() { }

  ngOnInit() {
    this.getMyJobPostings();
  }

  // TODO Fetches all job postings that were submitted by the corresponding user from this 'My Account' page.
  getMyJobPostings() {

  }

  // TODO Put Request to backend
  updateAccount() {

  }

  // TODO Delete Request to backend
  deleteAccount() {

  }

  // TODO Edit a job submission
  editJobSubmission($event) {

  }

  deleteJobSubmission($event) {
    this.myJobPostings = this.myJobPostings.filter(obj => obj !== $event);
    // TODO: Send changes to backend (DELETE JOB POSTING FROM DATABASE)
  }
}

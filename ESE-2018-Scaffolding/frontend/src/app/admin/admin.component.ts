import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Job } from '../job.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // userApplications: User[] = [];
  // jobSubmissions: Job[] = [];

  // Dummy Data: User Applications TODO: DELETE DUMMY DATA
  userApplications: User[] = [
    new User(
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
    ),
    new User(
      2,
      'info@max-muster.com',
      'pw',
      'Max Muster AG',
      'Company',
      'Bernstrasse 1',
      3000,
      'Bern',
      'max-muster.com',
      'Description text...'
    )
  ];

  // Dummy Data: Job Submissions TODO: DELETE DUMMY DATA
  jobSubmissions: Job[] = [
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
    ),
    new Job(
      3,
      'C++ Developer',
      'We need a graphics programmer',
      'C++',
      new Date(2021, 0, 0),
      new Date(2021, 11, 31),
      new Date(2020, 11, 31),
      100,
      100,
      'German, English',
      4000,
      'Basel',
      'One Time',
      100
    )
  ];
  constructor() { }

  ngOnInit() {
    this.onLoadingUserApplications();
    this.onLoadingJobSubmissions();
  }

  onLoadingUserApplications() {
    // TODO: Create request for backend to fetch all user applications from database with status 'open' and store in 'userApplications'
  }

  onLoadingJobSubmissions() {
    // TODO: Create request for backend to fetch all job submissions from database with status 'open' and store in 'jobSubmissions'
  }

  approveUserApplication($event) {
    this.userApplications = this.userApplications.filter(obj => obj !== $event);
    // TODO: Send changes to backend (UPDATE STATE 'OPEN' TO 'APPROVED')
  }

  denyUserApplication($event) {
    this.userApplications = this.userApplications.filter(obj => obj !== $event);
    // TODO: Send changes to backend (DELETE USER FROM DATABASE)
  }

  approveJobSubmission($event) {
    this.jobSubmissions = this.jobSubmissions.filter(obj => obj !== $event);
    // TODO: Send changes to backend (UPDATE STATE 'OPEN' TO 'APPROVED')
  }

  denyJobSubmission($event) {
    this.jobSubmissions = this.jobSubmissions.filter(obj => obj !== $event);
    // TODO: Send changes to backend (DELETE JOB POSTING FROM DATABASE)
  }
}

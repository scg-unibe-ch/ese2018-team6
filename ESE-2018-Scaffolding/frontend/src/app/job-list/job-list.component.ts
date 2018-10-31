import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  //jobPostings: Job[] = [];

  // Some dummy data to test the layout
  jobPostings: Job[] = [
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
    ),
    new Job(
      4,
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
      5,
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
    ),
    new Job(
      6,
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
      7,
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
    ),
    new Job(
      8,
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

  ngOnInit() { }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Job} from '../job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  // Some dummy data to test the layout
  jobs: Job[] = [
    new Job(
      'Java Developer',
      'We\'re looking for a Java developer',
      'Java',
      new Date(2019, 0, 0),
      new Date(2019, 11, 31),
      new Date(2018, 11, 31),
      50,
      100,
      'German, English',
      'Bern',
      'monthly',
      7800
    ),
    new Job(
      'Web Developer',
      'We want to hire a Web Developer',
      'HTML, CSS, Javascript',
      new Date(2020, 0, 0),
      new Date(2020, 11, 31),
      new Date(2019, 11, 31),
      80,
      100,
      'German, English',
      'Zürich',
      'hourly',
      50
    ),
    new Job(
      'C++ Developer',
      'We need a graphics programmer',
      'C++',
      new Date(2021, 0, 0),
      new Date(2021, 11, 31),
      new Date(2020, 11, 31),
      100,
      100,
      'German, English',
      'Basel',
      'oneTime',
      100
    ),
    new Job(
      'Web Developer',
      'We want to hire a Web Developer',
      'HTML, CSS, Javascript',
      new Date(2020, 0, 0),
      new Date(2020, 11, 31),
      new Date(2019, 11, 31),
      80,
      100,
      'German, English',
      'Zürich',
      'hourly',
      50
    ),
    new Job(
      'C++ Developer',
      'We need a graphics programmer',
      'C++',
      new Date(2021, 0, 0),
      new Date(2021, 11, 31),
      new Date(2020, 11, 31),
      100,
      100,
      'German, English',
      'Basel',
      'oneTime',
      100
    ),
    new Job(
      'Web Developer',
      'We want to hire a Web Developer',
      'HTML, CSS, Javascript',
      new Date(2020, 0, 0),
      new Date(2020, 11, 31),
      new Date(2019, 11, 31),
      80,
      100,
      'German, English',
      'Zürich',
      'hourly',
      50
    ),
    new Job(
      'C++ Developer',
      'We need a graphics programmer',
      'C++',
      new Date(2021, 0, 0),
      new Date(2021, 11, 31),
      new Date(2020, 11, 31),
      100,
      100,
      'German, English',
      'Basel',
      'oneTime',
      100
    )
  ];

  @Output()
  selectedComponent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onSelect(component: string) {
    this.selectedComponent.emit(component);
  }
}

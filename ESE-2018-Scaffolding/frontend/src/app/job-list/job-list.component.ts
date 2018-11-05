import {Component, OnInit} from '@angular/core';
import {Job} from '../job.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobPostings: Job[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem').subscribe(
      (instances: any) => {
        this.jobPostings = instances.map((instance) => new Job(
          instance.id,
          instance.title,
          instance.description,
          instance.skills,
          new Date(instance.startDate),
          new Date(instance.endDate),
          new Date(instance.validUntil),
          instance.workloadMin,
          instance.workloadMax,
          instance.languages,
          instance.street,
          instance.houseNumber,
          instance.postcode,
          instance.city,
          instance.salaryType,
          instance.salaryAmount,
          instance.companyId
      ))
      }
    );

    // TODO Await response due to empty array
    this.jobPostings.reverse();
  }

  isLoggedIn() {
    return localStorage.getItem('user-token');
  }
}

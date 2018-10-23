import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Fetch the job posting data from the backend to display it all on one page.
  onLoadingData() { }
}

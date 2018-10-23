import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Function to load the data from an existing job posting into form fields to edit them.
  onLoadingData() {}

  // Creates new request for backend to create a new job posting with data from form fields.
  onCreate() {}

  // Creates new request for backend to update an existing job posting with the data from from fields.
  onUpdate() {}
}

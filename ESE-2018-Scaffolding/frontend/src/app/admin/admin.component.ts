import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Create request for backend to fetch all user applications from the server with status 'open'
  onLoadingUserApplications() { }

  // Create request for backend to fetch all job submissions from the server with status 'open'
  onLoadingJobSubmissions() { }
}

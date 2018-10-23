import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css']
})
export class UserApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // User Application approved - change status in backend accordingly
  onApprovedUserApplication() { }

  // User Application denied - delete application from backend and write message to user with reason
  onDeniedUserApplication() { }
}

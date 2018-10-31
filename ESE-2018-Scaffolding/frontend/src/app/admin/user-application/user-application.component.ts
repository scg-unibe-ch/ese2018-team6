import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css']
})
export class UserApplicationComponent implements OnInit {

  @Input()
  userApplicationEntry: User;

  @Output()
  userApplicationApproved = new EventEmitter<User>();

  @Output()
  userApplicationDenied = new EventEmitter<User>();

  constructor() { }

  ngOnInit() { }

  onApprovedUserApplication() {
    this.userApplicationApproved.emit(this.userApplicationEntry);
  }

  // TODO: Send message with reasoning behind denial to applicant.
  onDeniedUserApplication() {
    this.userApplicationDenied.emit(this.userApplicationEntry);
  }
}

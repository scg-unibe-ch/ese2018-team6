import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Company} from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css']
})
export class UserApplicationComponent {

  @Input()
  userApplicationEntry: Company;

  @Output()
  userApplicationApproved = new EventEmitter<number>();
  @Output()
  userApplicationDenied = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve the user application with the given userId.
   */
  onApprovedUserApplication() {
    this.userApplicationApproved.emit(this.userApplicationEntry.id);
  }

  /**
   *  Emits an event to deny the user application with the given userId.
   */
  onDeniedUserApplication() {
    this.userApplicationDenied.emit(this.userApplicationEntry.id);
  }
}

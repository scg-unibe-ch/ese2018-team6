import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css']
})
export class UserApplicationComponent implements OnInit {

  @Input()
  userApplicationEntry: Company;

  @Output()
  userApplicationApproved = new EventEmitter<number>();

  @Output()
  userApplicationDenied = new EventEmitter<number>();

  constructor(public format: FormatService) { }

  ngOnInit() { }

  onApprovedUserApplication() {
    this.userApplicationApproved.emit(this.userApplicationEntry.id);
  }

  onDeniedUserApplication() {
    this.userApplicationDenied.emit(this.userApplicationEntry.id);
  }
}

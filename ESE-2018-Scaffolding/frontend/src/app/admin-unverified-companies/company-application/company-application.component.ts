import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-company-application',
  templateUrl: './company-application.component.html',
  styleUrls: ['./company-application.component.css']
})
export class CompanyApplicationComponent {

  @Input()
  companyEntry: Company;

  @Output()
  companyApproved = new EventEmitter<number>();
  @Output()
  companyDenied = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve the company application with the given companyId.
   */
  onApproveCompany() {
    this.companyApproved.emit(this.companyEntry.id);
  }

  /**
   *  Emits an event to deny the company application with the given companyId.
   */
  onDenyCompany() {
    this.companyDenied.emit(this.companyEntry.id);
  }
}

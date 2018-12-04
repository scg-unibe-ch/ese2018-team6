import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company} from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent {

  @Input()
  companyEntry: Company;

  @Output()
  companyApproved = new EventEmitter<number>();
  @Output()
  companyDenied = new EventEmitter<number>();
  @Output()
  companyFeatured = new EventEmitter<number>();
  @Output()
  companyUnfeatured = new EventEmitter<number>();
  @Output()
  companyDeleted = new EventEmitter<number>();

  constructor(
    public format: FormatService
  ) { }

  /**
   *  Emits an event to approve a company by changing its state to verified.
   */
  onApprovedCompany() {
    this.companyApproved.emit(this.companyEntry.id);
    this.companyEntry.verified = true;
  }

  /**
   *  Emits an event to deny a company by changing its state to unverified.
   */
  onDeniedCompany() {
    this.companyDenied.emit(this.companyEntry.id);
    this.companyEntry.verified = false;
  }

  /**
   *  Emits an event to feature a company.
   */
  onFeatureCompany() {
    this.companyFeatured.emit(this.companyEntry.id);
    this.companyEntry.featured = true;
  }

  /**
   *  Emits an event to unfeature a company.
   */
  onUnfeatureCompany() {
    this.companyUnfeatured.emit(this.companyEntry.id);
    this.companyEntry.featured = false;
  }

  /**
   *  Emits an event to delete a company.
   */
  onDeleteCompany() {
    this.companyDeleted.emit(this.companyEntry.id);
  }
}

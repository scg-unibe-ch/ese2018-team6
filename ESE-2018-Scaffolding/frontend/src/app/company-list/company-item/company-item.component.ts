import {Component, Input} from '@angular/core';
import {Company} from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent {

  @Input()
  companyData: Company;

  constructor(
    public format: FormatService,
  ) { }
}

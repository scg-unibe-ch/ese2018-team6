import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../../company.model';
import {FormatService} from '../../format.service';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {

  @Input()
  companyData: Company;

  constructor(
    public format: FormatService
  ) { }

  ngOnInit() {
  }

}

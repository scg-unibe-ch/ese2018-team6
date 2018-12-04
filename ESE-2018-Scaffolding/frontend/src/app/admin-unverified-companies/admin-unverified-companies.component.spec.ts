import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnverifiedCompaniesComponent } from './admin-unverified-companies.component';

describe('AdminUnverifiedCompaniesComponent', () => {
  let component: AdminUnverifiedCompaniesComponent;
  let fixture: ComponentFixture<AdminUnverifiedCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnverifiedCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnverifiedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

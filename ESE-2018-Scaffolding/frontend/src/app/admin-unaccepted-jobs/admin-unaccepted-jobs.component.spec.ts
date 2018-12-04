import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnacceptedJobsComponent } from './admin-unaccepted-jobs.component';

describe('AdminUnacceptedJobsComponent', () => {
  let component: AdminUnacceptedJobsComponent;
  let fixture: ComponentFixture<AdminUnacceptedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnacceptedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnacceptedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

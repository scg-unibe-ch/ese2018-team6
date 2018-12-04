import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllJobsComponent } from './admin-all-jobs.component';

describe('AdminAllJobsComponent', () => {
  let component: AdminAllJobsComponent;
  let fixture: ComponentFixture<AdminAllJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

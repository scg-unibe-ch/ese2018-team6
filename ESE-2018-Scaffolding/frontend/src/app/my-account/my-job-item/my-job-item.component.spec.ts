import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobItemComponent } from './my-job-item.component';

describe('MyJobItemComponent', () => {
  let component: MyJobItemComponent;
  let fixture: ComponentFixture<MyJobItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

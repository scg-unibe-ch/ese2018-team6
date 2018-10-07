import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobList} from '../job-list';
import {JobItem} from '../job-item';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  @Input()
  jobList: JobList;
  jobItem: JobItem = new JobItem(null, null, '', '', '');
  jobItems: JobItem[] = [];
  @Output()
  delete = new EventEmitter<JobList>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/jobitem', {
      params:  new HttpParams().set('jobListId', '' + this.jobList.id)
    }).subscribe((instances: any) => {
      this.jobItems = instances.map((instance) => new JobItem(instance.id,
        instance.jobListId, instance.title, instance.description, instance.skills));
    });
  }

  onSave() {
    this.httpClient.put('http://localhost:3000/joblist/' + this.jobList.id, {
      'name': this.jobList.name
    }).subscribe();
  }

  onDelete() {
    this.httpClient.delete('http://localhost:3000/joblist/' + this.jobList.id).subscribe(() => {
      this.delete.emit(this.jobList);
    });
  }

  onJobItemCreate() {
    this.jobItem.jobListId = this.jobList.id;
    this.httpClient.post('http://localhost:3000/jobitem', {
      'jobListId': this.jobItem.jobListId,
      'title': this.jobItem.title,
      'description': this.jobItem.description,
      'skills': this.jobItem.skills
    }).subscribe((instance: any) => {
      this.jobItem.id = instance.id;
      this.jobItems.push(this.jobItem);
      this.jobItem = new JobItem(null, this.jobList.id, '', '', '');
    });
  }

  onJobItemDelete(jobItem: JobItem) {
    this.jobItems.splice(this.jobItems.indexOf(jobItem), 1);
  }
}

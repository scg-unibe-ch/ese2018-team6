import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentComponent = 'jobs';

  constructor() { }

  ngOnInit() { }

  onNavigate(component: string) {
    this.currentComponent = component;
  }
}

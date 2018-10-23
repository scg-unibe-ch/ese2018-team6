import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  selectedComponent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onSelect(component: string) {
    this.selectedComponent.emit(component);
  }
}

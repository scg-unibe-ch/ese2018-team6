import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output()
  selectedComponent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onSelect(component: string) {
    this.selectedComponent.emit(component);
  }
}

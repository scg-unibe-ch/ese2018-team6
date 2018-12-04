import { Component } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent {
  minValue: number = 20;
  maxValue: number = 80;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };
}


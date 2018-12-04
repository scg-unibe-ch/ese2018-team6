import {Component} from '@angular/core';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public request: RequestService
  ) { }

  /**
   *  Toggles the visibility of the header menu (navbar and buttons section).
   *  Only available on mobile devices and smaller screens where media query gets triggered.
   */
  toggleMenu() {
    const element = document.getElementById('navbar-toggable');
    element.classList.toggle("displayDesktop");
  }
}

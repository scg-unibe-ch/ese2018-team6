import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  toggleMenu() {
    const element = document.getElementById('navbar-toggable');
    element.classList.toggle("navbar-hidden");
  }

  // TODO Sign out the current user
  onSignOut() { }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  toggleMenu() {
    const element = document.getElementById('navbar-toggable');
    element.classList.toggle("navbar-hidden");
  }

  isLoggedIn() {
    return localStorage.getItem('user-token');
  }

  onSignOut() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-token');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['']);
  }
}

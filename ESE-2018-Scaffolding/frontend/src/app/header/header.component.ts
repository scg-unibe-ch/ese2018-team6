import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public request: RequestService,
  ) { }

  /**
   *  Toggles the visibility of the header menu (navbar and buttons section).
   *  Only available on mobile devices and smaller screens where media query gets triggered.
   */
  toggleMenu() {
    const element = document.getElementById('navbar-toggable');
    element.classList.toggle("navbar-hidden");
  }

  /**
   *  Signs out the current user by deleting the user items in LocalStorage.
   */
  onSignOut() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('user-token');
    localStorage.removeItem('isAdmin');
    this.toastr.warning('', 'You are now signed out');
    this.router.navigate(['']).then();
  }
}

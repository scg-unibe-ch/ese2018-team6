import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // Send request to backend to create new entry in user database with the data entered by the user (current status set by backend: 'open')
  onRegister() { }
}

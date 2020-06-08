import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUser:string;
  constructor(private router: Router) { 
    this.loggedInUser = JSON.parse(localStorage.getItem('AuthDetails')).name
  }

  ngOnInit(): void {
  }
  signingOut () {
      localStorage.removeItem("AuthDetails")
      this.router.navigateByUrl('/login');
  }

}

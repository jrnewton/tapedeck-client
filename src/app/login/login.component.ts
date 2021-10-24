import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  requiresLogin: boolean;

  constructor(authService: AuthService) {
    this.requiresLogin = !authService.isAuthenticated;
    console.log('requiresLogin is', this.requiresLogin);
  }

  ngOnInit(): void {
  }

}

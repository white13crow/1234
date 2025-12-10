import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({selector:'app-login', templateUrl:'./login.component.html'})
export class LoginComponent {
  username = '';
  password = '';
  error = false;
  constructor(private auth: AuthService, private router: Router) {}
  login() {
    this.error = false;
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/profile']);
    } else this.error = true;
  }
}

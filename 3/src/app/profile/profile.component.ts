import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({selector:'app-profile', templateUrl:'./profile.component.html'})
export class ProfileComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}

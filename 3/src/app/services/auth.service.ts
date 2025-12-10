import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'Admin' && password === '12345') {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}

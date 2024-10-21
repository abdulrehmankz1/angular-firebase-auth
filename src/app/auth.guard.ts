import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Make sure the path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/']); // Redirect to login if not authenticated
    }
    return isLoggedIn;
  }
}

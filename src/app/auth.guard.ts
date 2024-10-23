import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in using the updated method
    return this.authService.getUserObservable().pipe(
      map((user) => {
        if (user || localStorage.getItem('user')) {
          return true; // Allow access if logged in or user is in localStorage
        } else {
          this.router.navigate(['/']); // Redirect to login if not logged in
          return false;
        }
      })
    );
  }
}

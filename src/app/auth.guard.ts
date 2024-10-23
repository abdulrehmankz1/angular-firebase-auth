// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const isLoggedIn = this.authService.isLoggedIn();
//     if (!isLoggedIn) {
//       this.router.navigate(['/']); // Redirect to login if not logged in
//       return false;
//     }
//     return true; // Allow navigation if logged in
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/']); // Redirect to login if not logged in
      return false;
    }
    return true; // Allow navigation if logged in
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth'; // Import User type

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent {
  userName: string | null = null;
  userImage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserObservable().subscribe((user: User | null) => {
      if (user) {
        this.userName = user.displayName; // Get the user's display name
        this.userImage = user.photoURL; // Get the user's photo URL
      } else {
        this.userName = null;
        this.userImage = null; // Reset if no user is logged in
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

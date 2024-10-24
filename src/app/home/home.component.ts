import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  userImage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserObservable().subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email; // Use displayName if available, otherwise use email
        this.userImage = user.photoURL; // Use photoURL if available
      } else {
        this.router.navigate(['/']); // Redirect to login if user not found
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  userName: string | null = null;
  userImage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    const user = this.authService.getUserInfo(); // Use the new public method to get the user info
    if (user) {
      // Fetch user data from Firestore
      const userData = await this.authService.getUserData(user.uid);
      if (userData) {
        this.userName = userData.name; // Use the name from Firestore
        this.userImage = userData.imageUrl; // Use the image URL from Firestore
      } else {
        this.userName = user.email; // Fallback to email if no user data found
        this.userImage = null; // No image available
      }
    } else {
      this.router.navigate(['/']); 
    }
  }

  async logout() {
    try {
        await this.authService.logout(); // Make sure the logout is successful
        this.router.navigate(['/']); // Navigate to the login page or home page
    } catch (error) {
        console.error('Logout failed', error); // Log any error that occurs
    }
}

}

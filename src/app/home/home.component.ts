// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
})
export class HomeComponent implements OnInit {
  users: any[] = []; // Define the users property

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadAllUsers(); // Load all users on component initialization
  }

  async loadAllUsers() {
    // Fetch all users from Firestore (implement this method in AuthService)
    const allUsers = await this.authService.getAllUsers();
    this.users = allUsers; // Assign fetched users to the users property
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}

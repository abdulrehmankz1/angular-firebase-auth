import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.authService.getUserName();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']); // Redirect to login page after logout
  }
}

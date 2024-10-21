import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule] // Ensure RouterModule is imported
})
export class AppComponent implements OnInit {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Check if user is logged in on app load
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // Redirect to home if user is already logged in
    }
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login successful!';
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.message = 'Login failed: ' + (error?.message || 'Unknown error');
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}

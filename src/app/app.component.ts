import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from './auth.service'; // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, RouterLink]
})
export class AppComponent {
  email: string = ''; // Declare email property
  password: string = ''; // Declare password property
  message: string = ''; // Declare message property to show login status

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login successful!'; // Set success message
      this.router.navigate(['/home']); // Redirect to home on successful login
    } catch (error: any) { // Specify error as any
      this.message = 'Login failed: ' + (error?.message || 'Unknown error'); // Set error message
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Example for navigating to home
  }
}

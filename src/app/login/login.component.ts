import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, RouterLink]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login successful!';
      this.router.navigate(['/home']); // Redirect to home page after successful login
    } catch (error: any) {
      this.message = 'Login failed: ' + (error?.message || 'Unknown error');
    }
  }

  async googleSignIn() {
    try {
      await this.authService.googleSignIn();
      this.message = 'Google login successful!';
      this.router.navigate(['/home']); // Redirect to home page after successful Google sign-in
    } catch (error: any) {
      this.message = 'Google login failed: ' + (error?.message || 'Unknown error');
    }
  }
}

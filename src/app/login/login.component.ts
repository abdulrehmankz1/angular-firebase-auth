import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // If using standalone 
  imports: [FormsModule]
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
      this.router.navigate(['/home']); // Navigate to home or another page after successful login
    } catch (error: any) {
      this.message = 'Login failed: ' + error.message;
    }
  }
}



import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SignupComponent {
signup() {
throw new Error('Method not implemented.');
}
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.message = 'Registration successful! Please login.';
    } catch (error: any) {
      this.message = 'Registration failed: ' + error.message;
    }
  }
}

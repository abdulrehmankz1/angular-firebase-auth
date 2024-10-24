import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, RouterLink],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  imageFile: File | null = null;
  message: string = '';

  constructor(private authService: AuthService) {}

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imageFile = input.files[0]; // Get the first file from the input
    }
  }

  async register() {
    if (this.imageFile) {
      try {
        await this.authService.register(
          this.email,
          this.password,
          this.name,
          this.imageFile
        );
        this.message = 'Registration successful! Please login.';
      } catch (error: any) {
        this.message = 'Registration failed: ' + error.message;
      }
    } else {
      this.message = 'Please upload an image.';
    }
  }
}

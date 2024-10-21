// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'firebase-auth';
// }
// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Specify that this is a standalone component
  imports: [FormsModule] // Add FormsModule to the imports array
})
export class AppComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    try {
      await this.authService.register(this.email, this.password);
      this.message = 'Registration successful!';
    } catch (error: any) { // Specify error as any
      this.message = 'Registration failed: ' + error.message;
    }
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.message = 'Login successful!';
    } catch (error: any) { // Specify error as any
      this.message = 'Login failed: ' + error.message;
    }
  }

  async logout() {
    await this.authService.logout();
    this.message = 'Logged out!';
  }
}

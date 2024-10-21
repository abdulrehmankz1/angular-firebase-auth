import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from './auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, RouterLink]
})
export class AppComponent {
  email: string = ''; 
  password: string = '';
  message: string = '';

  constructor(private router: Router, private authService: AuthService) {}

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

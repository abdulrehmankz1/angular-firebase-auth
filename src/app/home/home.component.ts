import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string | null = null;

  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }
}

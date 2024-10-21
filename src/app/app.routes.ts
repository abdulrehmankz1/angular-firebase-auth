import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Login component
import { SignupComponent } from './signup/signup.component'; // Signup component
import { HomeComponent } from './home/home.component'; // Home component
import { AuthGuard } from './auth.guard'; // Auth guard (if applicable)

export const appRoutes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'signup', component: SignupComponent }, // Signup route
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protected home route
  { path: '**', redirectTo: '' } // Redirect any unknown paths to login
];

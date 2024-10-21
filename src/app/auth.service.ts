import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from './app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor() {
    // Listen to auth state changes and persist session
    auth.onAuthStateChanged((user: User | null) => {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(auth);
    localStorage.removeItem('user'); // Remove user from local storage
  }

  isLoggedIn(): boolean {
    return this.user !== null || localStorage.getItem('user') !== null; // Check Firebase or localStorage
  }

  getUserName(): string | null {
    const localUser = localStorage.getItem('user');
    return this.user ? this.user.email : localUser ? JSON.parse(localUser).email : null; // Or user.displayName if set
  }
}

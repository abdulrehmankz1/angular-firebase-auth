import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor() {
    // Specify the type for the user parameter
    auth.onAuthStateChanged((user: User | null) => {
      this.user = user;
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
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  getUserName(): string | null {
    return this.user ? this.user.email : null; // Or user.displayName if set
  }
}

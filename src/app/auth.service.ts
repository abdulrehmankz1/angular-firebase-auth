// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './app.config'; // Your firebase config

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor() {
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

  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  getUserName(): string | null {
    return this.user ? this.user.email : null;
  }
}

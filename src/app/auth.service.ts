import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from './app.config'; // Your firebase config
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    // Check the authentication state on initialization
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
      } else {
        this.userSubject.next(null);
        localStorage.removeItem('user'); // Remove user data from localStorage
      }
    });
  }

  // Expose the user as an observable
  getUserObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null || localStorage.getItem('user') !== null; // Check if user is logged in (localStorage fallback)
  }

  // Login function
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  // Register function
  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  async logout(): Promise<void> {
    await signOut(auth);
    localStorage.removeItem('user'); // Remove user data from localStorage on logout
  }

  // Google sign-in function
  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  getUserName(): string | null {
    const user = this.userSubject.value || JSON.parse(localStorage.getItem('user') || 'null');
    return user ? user.email : null; // Return user email if logged in
  }
}

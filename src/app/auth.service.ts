import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { Firestore, setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore } from './app.config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  getUserObservable(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null || localStorage.getItem('user') !== null;
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async register(email: string, password: string, name: string, imageFile: File): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload the image and get the URL
    const imageUrl = await this.uploadImage(imageFile);

    // Store user data in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      imageUrl: imageUrl,
    });
  }

  async logout(): Promise<void> {
    await signOut(auth);
    localStorage.removeItem('user');
  }

  async googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  getUserName(): string | null {
    const user = this.userSubject.value || JSON.parse(localStorage.getItem('user') || 'null');
    return user ? user.email : null; // Change to return user name later
  }

  async uploadImage(file: File): Promise<string> {
    const storage = getStorage(); // Get a reference to the storage
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file
    await uploadBytes(storageRef, file); // Upload the file
    return await getDownloadURL(storageRef); // Get the download URL
  }
}

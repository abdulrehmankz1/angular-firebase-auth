// auth.service.ts
import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, getDoc, collection, getDocs } from 'firebase/firestore';
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
      if (user) {
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userSubject.next(null);
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

    // Update user profile with name and image
    await updateProfile(user, {
      displayName: name,
      photoURL: await this.uploadImage(imageFile),
    });

    // Store user data in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      imageUrl: user.photoURL,
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

  async getUserData(uid: string): Promise<any> {
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
  async getAllUsers(): Promise<any[]> {
    const usersCollection = collection(firestore, 'users');
    const userDocs = await getDocs(usersCollection);
    return userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  getUserInfo(): User | null {
    return this.userSubject.value || JSON.parse(localStorage.getItem('user') || 'null');
  }

  async uploadImage(file: File): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}

import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  googleProvider = new GoogleAuthProvider();

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  async login() {
    await signInWithPopup(this.auth, this.googleProvider);
  }

  async logOut() {
    await signOut(this.auth);
  }
}

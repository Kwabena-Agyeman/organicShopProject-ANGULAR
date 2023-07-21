import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: Auth) {}

  googleProvider = new GoogleAuthProvider();

  async login() {
    await signInWithPopup(this.auth, this.googleProvider);
  }
}

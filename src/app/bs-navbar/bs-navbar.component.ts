import { Component } from '@angular/core';
import { Auth, User, signOut, authState } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  authState$ = authState(this.auth);
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = this.authState$;
  }

  async log0ut() {
    await signOut(this.auth);
  }
}

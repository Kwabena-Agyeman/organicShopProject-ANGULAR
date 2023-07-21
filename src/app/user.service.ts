import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  async save(user: User) {
    const docRef = doc(this.db, `users/${user.uid}`);
    await setDoc(docRef, { name: user.displayName, email: user.email });
  }
}

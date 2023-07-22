import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: Firestore) {}

  async save(user: User) {
    const docRef = doc(this.db, `users/${user.uid}`);
    await updateDoc(docRef, { name: user.displayName, email: user.email });
    const userInfo = (await getDoc(docRef)).data();
  }

  getUserDoc(uid: string) {
    const docRef = doc(this.db, `users/${uid}`);
    const observable = from(
      getDoc(docRef).then((data) => (data.exists() ? data.data() : null))
    );

    return observable;
  }
}

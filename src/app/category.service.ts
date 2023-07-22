import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: Firestore) {}

  async getCategories() {
    console.log('called');
    try {
      const collectionRef = collection(this.db, 'categories');
      console.log('called-2');

      const categories: DocumentData[] = [];

      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((category) => {
        categories.push(category.data());
      });

      return categories;
    } catch (error) {
      return [];
    }
  }
}

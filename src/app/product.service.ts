import { Injectable } from '@angular/core';
import { Firestore, doc, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: Firestore) {}

  async saveProduct(product: {}) {
    try {
      const collectionRef = collection(this.db, 'products');
      await addDoc(collectionRef, product);
    } catch (error) {
      console.log(error);
    }
  }
}

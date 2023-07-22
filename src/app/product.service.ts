import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  addDoc,
  collection,
  DocumentData,
  getDocs,
} from '@angular/fire/firestore';

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

  async getProducts() {
    try {
      const collectionRef = collection(this.db, 'products');

      const products: DocumentData[] = [];

      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((product) => {
        products.push(product.data());
      });

      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

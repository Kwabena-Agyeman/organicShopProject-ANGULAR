import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getDoc,
  setDoc,
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

  async updateProduct(product: {
    id: string;
    Category: string;
    Price: number;
    Title: string;
    imageUrl: string;
  }) {
    try {
      const docRef = doc(this.db, `products/${product.id}`);
      const updatedProduct = {
        Category: product.Category,
        Price: product.Price,
        Title: product.Title,
        imageUrl: product.imageUrl,
      };
      await setDoc(docRef, updatedProduct);
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
        const productObj = { ...product.data(), id: product.id };
        products.push(productObj);
      });

      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getProduct(id: string) {
    try {
      const docRef = doc(this.db, `products/${id}`);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('no item found');
        return {};
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  }
}

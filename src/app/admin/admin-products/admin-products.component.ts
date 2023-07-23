import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  products: DocumentData[] = [];
  filteredProducts: DocumentData[] = [];
  constructor(private productService: ProductService) {}
  async ngOnInit() {
    const products = await this.productService.getProducts();
    this.products = products;
    this.filteredProducts = products;
  }

  filter(query: string) {
    if (!query) this.filteredProducts = this.products;

    this.filteredProducts = this.products.filter((p) =>
      p['Title'].toLowerCase().includes(query.toLowerCase())
    );
  }
}

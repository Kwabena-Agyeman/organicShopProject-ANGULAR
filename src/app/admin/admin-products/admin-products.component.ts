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
  constructor(private productService: ProductService) {}
  async ngOnInit() {
    this.products = await this.productService.getProducts();
    console.log(this.products);
  }
}

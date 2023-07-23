import { Component, OnInit, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: string = '';
  product: DocumentData = {};
  categories$: DocumentData[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
  }
  async ngOnInit(): Promise<void> {
    this.categories$ = await this.categoryService.getCategories();

    if (this.id) {
      this.product = await this.productService.getProduct(this.id);
    }
  }

  async save(product: {
    Category: string;
    Price: number;
    Title: string;
    imageUrl: string;
  }) {
    if (this.id) {
      const updatedProduct = { ...product, id: this.id };
      await this.productService.updateProduct(updatedProduct);
    } else {
      await this.productService.saveProduct(product);
    }

    this.router.navigate(['/admin/products']);
  }
}

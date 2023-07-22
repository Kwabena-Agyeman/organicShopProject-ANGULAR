import { Component, OnInit, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
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
  categories$: DocumentData[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  async ngOnInit(): Promise<void> {
    this.categories$ = await this.categoryService.getCategories();
  }

  async save(product: {}) {
    await this.productService.saveProduct(product);
    this.router.navigate(['/admin/products']);
  }
}

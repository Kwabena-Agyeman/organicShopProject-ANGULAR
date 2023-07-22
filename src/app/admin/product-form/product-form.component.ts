import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: DocumentData[] = [];

  constructor(private categoryService: CategoryService) {}
  async ngOnInit(): Promise<void> {
    this.categories$ = await this.categoryService.getCategories();
  }
}

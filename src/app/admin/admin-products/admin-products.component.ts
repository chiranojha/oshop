import { Product } from 'src/app/models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[] = [];
  subscription: Subscription;

  constructor(private router: Router, private productService: ProductService) {
    this.productService.getAll().subscribe((res) => {
      this.filteredProducts = this.products = res;
    });
  }

  filter(query: string) {
    if (query) {
      this.filteredProducts = this.products.filter((p) =>
        p.payload.val().title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  delete(idToDelete) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(idToDelete);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectedProductIndex = 0;

  product?: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  addToCart(productId: number | null | undefined) {
    if (productId) {
      this.productService.addToCart(productId).pipe(take(1)).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
      
    }
  }

  changeIndex(index: number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId: number | null | undefined) {
    if (productId) {
      this.router.navigate(['/buyProduct', {
        isSingleProductCheckout: true, id: productId
      }]);
    }
  }
}

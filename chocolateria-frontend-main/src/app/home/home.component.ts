import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  productDetails: Product[] = [];
  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword: string) {
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

  getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((products: Product[]) => products.map(product => this.imageProcessingService.createImages(product)))
      )
      .subscribe({
        next: (resp: Product[]) => {
          console.log(resp);
          this.showLoadButton = resp.length === 12;
          resp.forEach((p: Product) => {
            this.productDetails = this.productDetails.concat(p);
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProducts();
  }

  showProductDetails(productId:number | null) {
    this.router.navigate(['/productViewDetails', { productId }]);
  }
}
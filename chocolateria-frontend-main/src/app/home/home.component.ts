import { ImageProcessingService } from './../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  productDetails: any = {};
  searchForm: FormGroup;

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchKey: ['']
    });
    this.getAllProducts();
    this.onChanges();
  }

  onChanges(): void {
    this.searchForm.get('searchKey').valueChanges.subscribe(val => {
      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProducts(val);
    });
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.productDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId:number) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
}

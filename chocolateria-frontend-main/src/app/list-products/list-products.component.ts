import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageProcessingService } from '../image-processing.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.getAllProducts();

  }
  searchByKeyword(searchkeyword: string) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }
  public getAllProducts(searchKeyword: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe({
      next: (resp: Product[]) => {
        // console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        console.log('msg', this.productDetails);
        this.showTable = true;

        if(resp.length == 12) {
          this.showLoadMoreProductButton = true;
        } else {
          this.showLoadMoreProductButton = false;
        }

        // this.productDetails = resp;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }


  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (resp) => {
        this.getAllProducts();
      },
      error: (error:HttpErrorResponse) => {
        console.log(error);
      }
    });
  }


  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: number) {
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

}

import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FileHandle } from "../models/file-handle.model";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { Storage, ref, uploadBytes} from '@angular/fire/storage';
import { catchError, of } from "rxjs";


@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"],
})
export class NewProductComponent implements OnInit {
  isNewProduct = true;
  file: any;

  product: Product = {
    
    productId:0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };

  constructor(
    private storage: Storage,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];

    if(this.product && this.product.productId) {
      this.isNewProduct = false;
    }
  }

 /* addProduct(productForm: NgForm) {
    const formData = this.prepareFormDataForProduct(this.product);
    this.productService.addProduct(formData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }*/
  addProduct(productForm: NgForm) {
    const formData = this.prepareFormDataForProduct(this.product);
    this.productService.addProduct(formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(null); // Retorna un observable nulo para que el flujo pueda continuar
      })
    ).subscribe(
      (response: Product | null) => {
        if (response) { // Comprueba si la respuesta no es nula antes de usarla
          productForm.reset();
          this.product.productImages = [];
        }
      }
    );
  }

  prepareFormDataForProduct(product: Product): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    for (var i = 0; i < this.product.productImages.length; i++) {
      uploadImageData.append(
        "imageFile",
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      );
    }
    return uploadImageData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const imgRef = ref(this.storage, `images/${file.name}`);
     
      uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error));

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(event:any) {
    this.product.productImages.push(event);
  }
}
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
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
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {
    this.productForm = this.formBuilder.group({
      productId: [0],
      productName: ["", Validators.required],
      productDescription: ["", Validators.required],
      productDiscountedPrice: [0, Validators.required],
      productActualPrice: [0, Validators.required],
      productImages: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {

    const product: Product = this.activatedRoute.snapshot.data['product'];

    if(product && product.productId) {
      this.isNewProduct = false;
      this.productForm.patchValue(product);
    }
  }

  addProduct() {
    const formData = this.prepareFormDataForProduct(this.productForm.value);
    this.productService.addProduct(formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of(null); // Retorna un observable nulo para que el flujo pueda continuar
      })
    ).subscribe(
      (response: Product | null) => {
        if (response) { // Comprueba si la respuesta no es nula antes de usarla
          this.productForm.reset();
          this.productForm.setControl('productImages', this.formBuilder.array([]));
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

    for (var i = 0; i < product.productImages.length; i++) {
      uploadImageData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
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
      (this.productForm.get('productImages') as FormArray).push(this.formBuilder.control(fileHandle));
    }
  }

  removeImages(i: number) {
    (this.productForm.get('productImages') as FormArray).removeAt(i);
  }

  fileDropped(event:any) {
    (this.productForm.get('productImages') as FormArray).push(this.formBuilder.control(event));
  }
}

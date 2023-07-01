import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewProductComponent } from './new-product/new-product.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ShowProductImagesDialogComponent } from './show-product-images-dialog/show-product-images-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProductComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    UserComponent,
    AdminComponent,
    ProductViewDetailsComponent,
    ListProductsComponent,
    ShowProductImagesDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    RouterModule,
    

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

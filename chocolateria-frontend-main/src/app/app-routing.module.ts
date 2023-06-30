import { ProductResolveService } from './product-resolve.service';
import { AuthGuard } from './auth/auth.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "register",
    component: RegistroComponent
  },
  {
    path: "addNewProduct",
    component: NewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ProductResolveService } from './product-resolve.service';
import { AuthGuard } from './auth/auth.guard';
import { NewProductComponent } from './new-product/new-product.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,/*
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },*/
  },
  {
    path: "user",
    component: UserComponent,
    /*canActivate: [AuthGuard],
    data: { roles: ["User"] }, */
  },
  { path: "login", component: LoginComponent },
  {
    path: "register",
    component: RegistroComponent
  },
  {
    path: "addNewProduct",
    component: NewProductComponent,
    /*canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService,
    },*/
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

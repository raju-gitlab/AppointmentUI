import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AuthguardGuard } from '../guards/authguard.guard';
import { ProductComponent } from './product/product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { OrderProductComponent } from './order-product/order-product.component';

const routes: Routes = [
  {path:"Filter/Products/:Id",component:FilterComponentComponent},
  {path:"HomePage",component:HomepageComponent,canActivate :[AuthguardGuard]},
  {path:"Cart",component:CartComponent},
  {path:"CreateProduct",component:CreateProductComponent,canActivate :[AuthguardGuard]},
  {path:"productById/:Id",component:ProductComponent,canActivate :[AuthguardGuard]},
  {path:"ManageProducts",component:ManageProductsComponent,canActivate :[AuthguardGuard]},
  {path:"OrderProduct",component:OrderProductComponent,canActivate :[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModulesRoutingModule { }

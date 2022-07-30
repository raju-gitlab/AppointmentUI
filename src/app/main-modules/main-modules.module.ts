import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainModulesRoutingModule } from './main-modules-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { MaterialModule } from '../material/material.module';
import { CartComponent } from './cart/cart.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductComponent } from './product/product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { OrderProductComponent } from './order-product/order-product.component';


@NgModule({
  declarations: [HomepageComponent, FilterComponentComponent, CartComponent, CreateProductComponent, ProductComponent, ManageProductsComponent, OrderProductComponent],
  imports: [
    CommonModule,
    MainModulesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModulesModule { }

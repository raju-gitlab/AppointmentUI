import { CartModel } from './../../model/cart-model';
import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{HttpClient, HttpResponse } from '@angular/common/http'
import { from } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartServiceService } from 'src/app/Services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  UserId : string;
  cartItems : any;
  TotalcartItems : number;
  Totalcount : any = 0;
  OrderForm = new FormGroup({
    ProductName : new FormControl('',Validators.required),
    ProductbasePrice : new FormControl('',Validators.required),
    ProductQuantity : new FormControl('',Validators.required),
    ProductGuid : new FormControl('',Validators.required)
  });
  fromdata = new FormGroup({
    CartId : new FormControl('')
  })
  constructor(private Dataservice : DataserviceService,private route : Router,private http : HttpClient,private _snackBar: MatSnackBar,private cartservice : CartServiceService) {
    this.UserId = sessionStorage.getItem("UserGuid");
    this.GetCartItems();
  }
    GetCartItems(){
    if(this.UserId != null && this.UserId.length > 0)
    {
      this.fromdata.patchValue({["CartId"] : this.UserId});
      let CartId = this.UserId;
      // let Retdata = this.cartservice.GetCartItems("Cart/cart");
      // console.log("tis is called data from cart service");
      // console.log(Retdata);
      this.Dataservice.Get("Cart/cart").subscribe(data=>{
        this.cartItems = data;
        console.log(this.cartItems)
        this.TotalcartItems = data?.length;
        for (let index = 0; index < data?.length; index++) {
          this.Totalcount = this.Totalcount + (data[index].ProductbasePrice * data[index].ProductQuantity);
        }
      });
    } 
    else{
      this.route.navigateByUrl("/Login");
    }
  }

  RemoveFromCart(ProductId : any){
    this.Dataservice.Delete("Cart/RemovefromCart?ProductId=" + ProductId).subscribe(data => {
      this.GetCartItems();
      let durationInSeconds = 2;
      this._snackBar.open('Successfull', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration : durationInSeconds * 1000
    });
    },
    errr => {
      console.log("response error");
    });
  }

  checkCartItemQuantity(){
    console.log("Total item is",this.TotalcartItems);
    return this.TotalcartItems;
  }

  // Order(){
  //   console.log(this.OrderForm.value);
  // }
    ngOnInit() {
  }

}


import { logging } from 'protractor';
import { Products } from './../../model/products';
import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CartServiceService } from 'src/app/Services/cart-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Products : any;

  addincart = new FormGroup({
    ProductId : new FormControl('',Validators.required),
    ProductQuantity : new FormControl('',Validators.required)
  });

  constructor(private Dataservice : DataserviceService,private _snackBar: MatSnackBar,private Cartservice : CartServiceService) {
      this.Dataservice.Get("Product/Products").subscribe(data =>{
        this.Products = data;
        console.log(data);
      })
   }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  addInCart(data : any){
    this.addincart.patchValue({["ProductId"] : data});
    this.addincart.patchValue({["ProductQuantity"] : 1})
    console.log(this.addincart.value);
    let responsedata = this.Cartservice.AddItemsInCart(this.addincart.value,"Cart/AddCartItems");
    console.log(responsedata);
    this.ItemsIncart();
    if(responsedata)
    {
      let durationInSeconds = 2;
      this._snackBar.open('Added in your Cart', 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration : durationInSeconds * 1000
      });
    }
    else
    {
      console.log("Not success");
    }
 
  }

  ItemsIncart(){
    let totalitems = this.addincart.value.ProductQuantity;
    if(totalitems){
      totalitems = 1;
    }
    else
    {
      totalitems = 0;
    }
    return totalitems;
  }

  ngOnInit(): void {
  }

}

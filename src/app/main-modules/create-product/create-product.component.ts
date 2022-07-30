import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProductType } from 'src/app/model/product-type';
import { FormGroupName, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  productTypes: ProductType[] | any;
  // CrateProductFrom = new FormGroup({
  //   ProductName: new FormControl('', Validators.required),
  //   ProductbasePrice: new FormControl('', Validators.required),
  //   ProductQuantity: new FormControl('', Validators.required),
  //   ProductType: new FormControl('', Validators.required),
  //   ProductImage: new FormControl('', Validators.required)
  // });

  CrateProductFrom = new FormGroup({
    title: new FormControl('', Validators.required),
    agenda: new FormControl('', Validators.required),
    AppountmentDate: new FormControl('', Validators.required),
    guest: new FormControl('', Validators.required),
    creatorid: new FormControl('', Validators.required)
  });

  ProductImagePath: any;
  constructor(private DataService: DataserviceService, private _snackBar: MatSnackBar) {
    this.DataService.Get("Product/GetProductTypesList").subscribe(data => {
      this.productTypes = data;
    });
  }

  SubmitCrateProductForm() {
    this.CrateProductFrom.patchValue({["creatorid"] : sessionStorage.getItem("UserGuid")});
    console.log(this.CrateProductFrom.value);
    
    this.DataService.Post(this.CrateProductFrom.value, "api/BookAppointment").subscribe(data => {
      if(data) {
        console.log("Data");
        console.log(data);
      }
    },
    error =>{
      console.log(error);
    });
  }
  ngOnInit() {

  }

}

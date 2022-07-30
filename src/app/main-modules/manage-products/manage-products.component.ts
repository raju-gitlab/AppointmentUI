import { DataserviceService } from 'src/app/Services/dataservice.service';
import { LoginComponent } from './../../authentication/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupName, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  CrateProductFrom = new FormGroup({
    ProductName : new FormControl('',Validators.required),
    ProductQuantity : new FormControl('',Validators.required),
    ProductbasePrice : new FormControl('',Validators.required),
    ProductType : new FormControl('',Validators.required)
  });
  OpenModaldata : any = [];
  closeResult: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ProductData = [];
  constructor(private Dataservice : DataserviceService, private _snackBar: MatSnackBar,private modalService: NgbModal) { 
    this.LoadProducts();
  }

  openLg(content,data : any){
    this.OpenModaldata.length = 0;
    this.OpenModaldata.push(data);
    this.modalService.open(content, { size: 'lg' });
  }
  openwarn(data : any){
    console.log("Works",data);
  }

  LoadProducts(){
    let email = sessionStorage.getItem("Email");
    this.Dataservice.Get("api/listAppointments/" + email).subscribe(data =>{
      this.ProductData = data;
      console.log(this.ProductData);
      
    },
    error =>{
      console.log("Response Error");
    })
  }

  DeleteItem(data : any){
    if(!confirm("Do you want to delete this Product")) return;
    this.Dataservice.Delete("Product/DeleteProduct?ProductId=" + data).subscribe(data => {
      let durationInSeconds = 2;
      this._snackBar.open('Product deleted Successfully', 'dissmiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration : durationInSeconds * 1000
    });
    this.LoadProducts();
    },
    error => {
      let durationInSeconds = 2;
      this._snackBar.open('Product Not deleted', 'dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration : durationInSeconds * 1000
    });
    })
  }

  SubmitFrom(){
    console.log(this.CrateProductFrom.value);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Products } from 'src/app/model/products';
import { DataserviceService } from 'src/app/Services/dataservice.service';
import { convertToObject } from 'typescript';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  ProductDetails = [];
  constructor(private Dataservice : DataserviceService, private route : ActivatedRoute) { 
    let Id = this.route.snapshot.paramMap.get("Id");
    this.getProduct(Id);
  }
  getProduct(Id : any)
  {
    this.Dataservice.Get("Product/ProductById?Id=" + Id).subscribe(data =>{
      this.ProductDetails.push(data);
    },
    err =>{
      console.log("response error");
    });
  }

  ngOnInit(): void {
  }

}

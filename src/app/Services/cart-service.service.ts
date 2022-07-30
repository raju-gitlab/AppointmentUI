import { DataserviceService } from './dataservice.service';

import { Injectable } from '@angular/core';
import { Console } from 'console';
import { reduceEachTrailingCommentRange } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private service : DataserviceService) { }

  dataservice : any;
  constdata : any;
  AddItemsInCart(data : any , urlParam : any) : boolean {
    this.service.Post(data,urlParam).subscribe(data =>{
      this.constdata = true;
    },
    err =>{
      this.constdata = false; 
    });

    if(this.constdata){
      return true;
    }
    else{
      return false;
    }
  }

  GetCartItems(UrlParam : any){
    return this.service.Get(UrlParam).subscribe(data => {
      console.log("Data from cart service");
      console.log(data);
      return data;
    },
    err => {
      console.log("error");
    });  
  }
}

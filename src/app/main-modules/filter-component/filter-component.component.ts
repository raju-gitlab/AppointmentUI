import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})
export class FilterComponentComponent implements OnInit {

  product : any;
  constructor(private Dataservice : DataserviceService, private route : ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get("Id");
    console.log(id);
    // this.Dataservice.Get("api/Products/ProductsByid/"+id).subscribe(data =>{
    //   this.product = data;
    // },
    // error=>{
    //   console.log("error");
    // });
   }

  onprint(data){
    console.warn(data);
  }

  ngOnInit(): void {
  }

}

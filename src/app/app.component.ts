import { HttpHeaders } from '@angular/common/http';
import { DataserviceService } from './Services/dataservice.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MyErrorStateMatcher } from './authentication/login/login.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ShopAPI';
  LoginStatus : boolean;
  ImageSRC : string;
  constructor(private Dataservice : DataserviceService,private modalService: NgbModal,private router : Router){
    
    if(sessionStorage.getItem("UserGuid") != null)
    {
      this.LoginStatus = false;
    }
    else
    {
      this.LoginStatus = true;
    }
  }

  LogOut(){
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  LoginForm = new FormGroup({
    Email : new FormControl('',Validators.required),
    Password : new FormControl('',Validators.required)
  });
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  Printvalue(datas)
  {
    console.log(datas);
  }
  onFromsubmit(){
    this.Dataservice.Post(this.LoginForm.value,"api/login").subscribe(data =>{
      sessionStorage.setItem("UserGuid",data._id);
        sessionStorage.setItem("Email",data.Email);
        this.router.navigate(['HomePage']).then(() => {
          window.location.reload();
        });
    },
    error =>{
      console.log("Request Not Completed");
    });
  }
  matcher = new MyErrorStateMatcher();

  ngOnInit(){
    
  }
}

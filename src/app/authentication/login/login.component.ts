import { Observable } from 'rxjs';
import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { convertToObject } from 'typescript';
import { LoginModel } from 'src/app/model/login-model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userUUID : any;
  public customformFilters:Array<LoginModel> = new Array<LoginModel>();
  responsedata : any;
  abc : any;
  constructor(private Dataservice : DataserviceService,private modalService: NgbModal,private route : ActivatedRoute,private router : Router) { }
  value = '';
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
  onFromsubmit() : void{
      this.Dataservice.Post(this.LoginForm.value,"api/login").subscribe(data =>{
        sessionStorage.setItem("UserGuid",data._id);
        sessionStorage.setItem("Email",data.Email);
        this.router.navigate(['HomePage']).then(() => {
          window.location.reload();
        });
      },
      err=>{
        window.alert("UserName or Password is not correct");
      })
  }
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
  }

}

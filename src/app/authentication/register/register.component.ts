import { DataserviceService } from './../../Services/dataservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private Dataservice : DataserviceService,private routes : Router) { }
  imageUrl : string | ArrayBuffer;
  filePath: string;

  RegisterFrom = new FormGroup({
    Name : new FormControl('',Validators.required),
    Email : new FormControl('',Validators.required),
    Password : new FormControl('',Validators.required),
    ContactNumber : new FormControl('',Validators.required)
  });

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm()
  {
    this.Dataservice.PostRegister(this.RegisterFrom.value,"api/register").subscribe(data => {
      this.routes.navigateByUrl("Login");
    },
    err=>{
      console.warn("Response Error");
    });
  }

  ngOnInit(): void {
  }

}

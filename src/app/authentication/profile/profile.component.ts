import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/Services/dataservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Status : any;
  ProfileName : any;

  RegisterFrom = new FormGroup({
    Name: new FormControl('', Validators.required),
    UserId: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });

  UpdateStatusForm = new FormGroup({
    UserId: new FormControl('', Validators.required),
    UserStatus: new FormControl('', Validators.required)
  });
  // Email
  constructor(private Dataservice: DataserviceService, private routes: Router) { 
    this.ProfileName = "Raju Basak";
    // this.Status = "Active";
  }

  submitForm() {
    this.RegisterFrom.patchValue({ ["UserId"]: sessionStorage.getItem("UserGuid") });
    this.Dataservice.put(this.RegisterFrom.value, "api/updateprofile").subscribe(data => {
      this.ProfileName = this.RegisterFrom.value.Name;
      window.alert("Profile Updated");
    },
      err => {
        console.warn("Response Error");
      });
  }

  updateProfileStatus(data: any) {
    this.UpdateStatusForm.patchValue({ ["UserId"]: sessionStorage.getItem("Email") });
    this.UpdateStatusForm.patchValue({ ["UserStatus"]: data });
    console.log(this.UpdateStatusForm.value);
    
    this.Dataservice.Post(this.UpdateStatusForm.value, "api/UpdateStatus").subscribe(data => {
      this.Status = "Not Active";
    },
      error => {
        console.error(error);
      })
  }
  ngOnInit(): void {
  }

}

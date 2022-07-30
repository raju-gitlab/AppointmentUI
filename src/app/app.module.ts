import { MainModulesRoutingModule } from './main-modules/main-modules-routing.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HomepageComponent } from './main-modules/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { MainModulesModule } from './main-modules/main-modules.module';
import { AuthguardGuard } from './guards/authguard.guard';
import { CartServiceService } from './Services/cart-service.service';
import { DataserviceService } from './Services/dataservice.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainModulesRoutingModule
  ],
  providers: [AuthguardGuard,CartServiceService,DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

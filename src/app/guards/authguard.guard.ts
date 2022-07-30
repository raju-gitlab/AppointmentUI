import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean  {
    if(sessionStorage.getItem("UserGuid") != null)
    {
      return true;
    }
    else
    {
      this.router.navigateByUrl("Login");
      return false;
    }
  }
  
}

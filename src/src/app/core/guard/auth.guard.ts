import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,){
    
  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot)
  {

    if (localStorage.getItem('isLoggedin')) { 
      if (state.url === '/dashboard') return true;
    }
    else{
      this.router.navigate(['/auth']);
    }
   this.router.navigate(['/auth']);
    return true;
  }
  
}

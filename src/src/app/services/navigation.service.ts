import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }


  goToRegister(){
    this.router.navigate(['/auth/register']);
  }
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }


}
